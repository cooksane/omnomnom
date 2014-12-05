define([
    "core/EventBus",
    "core/Utils",
    "views/InterfaceViewBase"
], function(EventBus, Utils, InterfaceViewBase) {

    return InterfaceViewBase.extend({

        className: "",
        template: nom.templates.RecipeSBS,
        ingredientTemplate: nom.templates.Ingredient,
        instructionTemplate: nom.templates.InstructionSBS,

        events: {
            "click #done": 'recipeComplete',
            "click #prev": "prevClick",
            "click #next": "nextClick",
            "click": "onClick"
        },

        initialize: function(){
            console.log("SBSView.initialize");
             _.bindAll(this, 'keyAction');
            $(document).bind('keyup', this.keyAction);
        },

        die: function(){
            $(document).unbind('keyup', this.keyAction);
            this.undelegateEvents();
            this.remove();
        },

        render: function(){
            console.log("SBSView.render");
            this.renderTemplate();
            this.renderModel();
        },

        renderTemplate: function(){
            var recipe = this.model.attributes;
            var compiledTemplate = this.template(recipe);
            this.$el.html(compiledTemplate);
            $("#main-container").html(this.el);
        },

        renderModel: function(){
            this.renderIngredients();

            // compute height
            var container = this.$el.find("#instruction-container");
            var instructions = this.model.get("CuratedInstructions");
            this.instructionHeight = 0;
            for (var i=-1; ++i < instructions.length; ) {
                container.empty();
                var compiledTemplate = this.instructionTemplate(instructions[i]);
                container.html(compiledTemplate);
                this.instructionHeight = Math.max(this.instructionHeight, container.height());
                console.log(container.height());
            }
            container.height(this.instructionHeight);
            container.removeClass("invisible");
            
            // actually render instructions
            this.renderInstruction();
            this.updateButtons();
        },

        renderIngredients: function(){
            var result = this.model.attributes;
            var ingredients = result.Ingredients;
            var ingredientContainer = this.$el.find("#ingredients-container");
            for(var i=-1;++i<ingredients.length;){
                var ingredient = ingredients[i];
                var compiledTemplate = this.ingredientTemplate(ingredient);
                ingredientContainer.append(compiledTemplate);
            }
        },

        keyAction: function(e) {
            var code = e.keyCode || e.which;
            if (code == 39) { // right arrow
                e.stopImmediatePropagation();
                this.updateLog("rightKey", this.next());
            } else if (code == 37) {  // left arrow
                e.stopImmediatePropagation();
                this.updateLog("leftKey", this.prev());
            } else {
                this.onKey(e);
            }
        },

        prevClick: function(e){
            e.stopImmediatePropagation();
            this.updateLog("prevClick", this.prev());
        },

        nextClick: function(e){
            e.stopImmediatePropagation();
            this.updateLog("nextClick", this.next());
        },

        prev: function(){
            var instructions = this.model.get("CuratedInstructions");
            if(this.stepIndex > 0){
                this.lastIndex = this.stepIndex;
                this.stepIndex -= 1;
                this.renderInstruction();
                this.updateButtons();
                return true;
            }
            return false;
        },

        next: function(){
            var instructions = this.model.get("CuratedInstructions");
            if(this.stepIndex < instructions.length-1){
                this.lastIndex = this.stepIndex;
                this.stepIndex += 1;
                this.renderInstruction();
                this.updateButtons();
                return true;
            }
            return false;
        },

        updateButtons: function(){
            function updateBtn(enable, $btn){
                if(enable && $btn.hasClass("disabled")){
                    $btn.removeClass("disabled");
                } else if(!enable && !$btn.hasClass("disabled")){
                    $btn.addClass("disabled");
                }
            }

            var instructions = this.model.get("CuratedInstructions");
            updateBtn(this.stepIndex > 0, this.$el.find("#prev"));
            updateBtn(this.stepIndex < instructions.length-1, this.$el.find("#next"));
        },

        renderInstruction: function(){
            var instructions = this.model.get("CuratedInstructions");

            // set state of prev & next buttons
            if (this.stepIndex === 0) {
                this.$el.find("#prev").addClass("inactive");
            } else {
                this.$el.find("#prev").removeClass("inactive");
            }
            if (this.stepIndex === instructions.length-1) {
                this.$el.find("#next").addClass("inactive");
            } else {
                this.$el.find("#next").removeClass("inactive");
            }

            var steps = this.$el.find("#sbs-nav-step");
            steps.html("Step " + (this.stepIndex+1) + " of " + (instructions.length));

            var container = this.$el.find("#instruction-container");
            container.empty();
            var compiledTemplate = this.instructionTemplate(instructions[this.stepIndex]);
            container.html(compiledTemplate);

            this.highlightIngredients();
        },

        highlightIngredients: function(){
            var instructions = this.model.get("CuratedInstructions");
            var instruction = instructions[this.stepIndex];
            var ingredientIndexes = instruction.ingredientIndexes;

            var ingredients = this.model.get("Ingredients");
            var ingredientContainer = this.$el.find("#ingredients-container");

            var $ingredient;
            for(var i=-1;++i<ingredients.length;){
                var ingredient = ingredients[i];
                $ingredient = ingredientContainer.find("#ingredient_"+ingredient.DisplayIndex);
                $ingredient.removeClass("highlight-text");
                $ingredient.addClass("text-muted");
            }
            for(var j=-1;++j<ingredientIndexes.length;){
                var iIndex = ingredientIndexes[j];
                $ingredient = ingredientContainer.find("#ingredient_"+iIndex);
                $ingredient.addClass("highlight-text");
                $ingredient.removeClass("text-muted");
            }
        }

    });

});
