define([
    "core/EventBus",
    "core/Utils",
    "views/InterfaceViewBase"
], function(EventBus, Utils, InterfaceViewBase) {

    return InterfaceViewBase.extend({

        className: "full-vertical",
        template: nom.templates.RecipeResponsive,
        ingredientTemplate: nom.templates.Ingredient,
        instructionTemplate: nom.templates.InstructionResponsive,

        events: {
            'click .instruction': 'instructionClicked',
            "click #done": 'recipeComplete',
            "click": "onClick"
        },

        viewLookup: [],

        initialize: function(params){
            this.appData = params.appData;
            console.log("ResponsiveView.initialize");
            _.bindAll(this, 'keyAction');
            $(document).bind('keyup', this.keyAction);
        },

        die: function(){
            $(document).unbind('keyup', this.keyAction);
            this.undelegateEvents();
            this.remove();
        },

        render: function(){
            console.log("ResponsiveView.render");
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
            this.renderInstructions();
            this.selectInstruction();
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
            if (code == 38) { // up arrow
                e.stopImmediatePropagation();
                this.updateLog("upKey", this.prev());
            } else if (code == 40) {  // down arrow
                e.stopImmediatePropagation();
                this.updateLog("downKey", this.next());
            } else {
                this.onKey(e);
            }
        },

        instructionClicked: function(event) {
            event.stopImmediatePropagation();
            var index = $(event.currentTarget).data('index') - 1;
            if (this.stepIndex != index) {
                this.lastIndex = this.stepIndex;
                this.stepIndex = index;
                this.selectInstruction();
                this.updateLog("instructionClick", true);
            } else {
                this.updateLog("instructionClick", false);
            }
        },

        prev: function(){
            var instructions = this.model.get("CuratedInstructions");
            if (this.stepIndex > 0){
                this.lastIndex = this.stepIndex;
                this.stepIndex -= 1;
                this.selectInstruction();
                return true;
            }
            return false;
        },

        next: function(){
            var instructions = this.model.get("CuratedInstructions");
            if (this.stepIndex < instructions.length-1){
                this.lastIndex = this.stepIndex;
                this.stepIndex += 1;
                this.selectInstruction();
                return true;
            }
            return false;
        },

        renderInstructions: function() {
            var result = this.model.attributes;
            var instructions = result.CuratedInstructions;
            var container = this.$el.find("#instruction-container");

            this.instructionHeight = 0;
            for (var i = -1; ++i < instructions.length; ) {
                var compiledTemplate = this.instructionTemplate(instructions[i]);
                this.viewLookup.push(compiledTemplate);
                container.append(compiledTemplate);
                var height = this.$el.find("#instruction_" + (i+1)).height();
                this.instructionHeight = Math.max(this.instructionHeight, height);
            }

            this.$el.find(".instruction").removeClass("responsive-selected");
            this.$el.find("#instruction-container").removeClass("invisible");

            console.log(this.instructionHeight);
        },

        selectInstruction: function(){
            this.selectView(true, this.stepIndex);
            if (this.lastIndex != -1){
                this.selectView(false, this.lastIndex);
            }
            this.highlightIngredients();
        },

        selectView: function(select, index){
            var instructions = this.model.get("CuratedInstructions");
            var targetInstruction = instructions[index];
            var targetView = this.$el.find("#instruction_"+(index+1));
            var targetHTML = targetView.find(".responsive-text");
            if (select) {
                targetView.addClass("responsive-selected");
                targetView.height(this.instructionHeight);
            } else {
                targetView.removeClass("responsive-selected");
                targetView.css('height','auto');
            }
        },

        highlightIngredients: function(){
            if(!this.appData.inghi){return;}

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
