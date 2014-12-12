define([
    "core/EventBus",
    "core/Utils",
    "views/InterfaceViewBase"
], function(EventBus, Utils, InterfaceViewBase) {

    return InterfaceViewBase.extend({

        className: "",
        template: nom.templates.RecipeColumn,
        ingredientTemplate: nom.templates.IngredientSimple,
        stagesTemplate: nom.templates.Stage,
        instructionTemplate: nom.templates.InstructionSBS,
        toolsTemplate: nom.templates.Tool,

        events: {
            "click #done": 'recipeComplete',
            "click #prev": "prevClick",
            "click #next": "nextClick",
            "click": "onClick"
        },

        initialize: function(params){
            this.appData = params.appData;
            console.log("ColumnView.initialize");
             _.bindAll(this, 'keyAction');
            $(document).bind('keyup', this.keyAction);
            this.updateLog("startClick", true);
        },

        die: function(){
            $(document).unbind('keyup', this.keyAction);
            this.undelegateEvents();
            this.remove();
        },

        render: function(){
            console.log("ColumnView.render");
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
            this.renderStages();
            this.renderIngredients();
            this.renderToolsVertical();

            // compute height
            var container = this.$el.find("#instruction-container");
            var instructions = this.model.get("CuratedInstructions");
            this.instructionTextHeight = 0;
            var instructionContainerHeight = 0;
            for (var i=-1; ++i < instructions.length; ) {
                container.empty();
                var compiledTemplate = this.instructionTemplate(instructions[i]);
                container.html(compiledTemplate);
                var instructionTextHeight = this.$el.find("#sbs-instruction-text").height();
                if (this.instructionTextHeight < instructionTextHeight) {
                    this.instructionTextHeight = instructionTextHeight;
                }
            }
            container.height(this.instructionTextHeight + 300 /* 40 + height of image (250) */ );
            container.removeClass("invisible");
            
            // actually render instructions
            this.renderInstruction();
            this.updateButtons();
        },

        renderToolsSimple: function() {
            if (this.model.tools) {
                var toolsContainer = this.$el.find("#tools-container");

                var tools = this.model.tools[0].quantity + ' ' + this.model.tools[0].name;
                for (var i=0; ++i < this.model.tools.length; ) {
                    tools += ', ' + this.model.tools[i].quantity + ' ' + this.model.tools[i].name;
                }

                toolsContainer.html(tools);
            }
        },

        renderToolsVertical: function() {
            if (this.model.tools) {
                var toolsContainer = this.$el.find("#tools-container");

                for (var i=-1; ++i<this.model.tools.length; ) {
                    var compiledTemplate = this.toolsTemplate(this.model.tools[i]);
                    toolsContainer.append(compiledTemplate);
                }
            }
        },

        renderStages: function() {
            var result = this.model.attributes;
            var stages = result.Stages;
            var stagesContainer = this.$el.find("#stages-container");
            for (var i=-1;++i<stages.length;) {
                var compiledTemplate = this.stagesTemplate(stages[i]);
                stagesContainer.append(compiledTemplate);
            }
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
            if (code == 40) { // down arrow
                e.stopImmediatePropagation();
                this.updateLog("rightKey", this.next());
            } else if (code == 38) {  // up arrow
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
            if (this.stepIndex < instructions.length-1) {
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
            var next = this.$el.find("#next");
            updateBtn(this.stepIndex > 0, this.$el.find("#prev"));
            updateBtn(this.stepIndex < instructions.length-1, next);

            if (this.stepIndex == instructions.length-1) {
                console.log('removing hidden');
                this.$el.find("#done").removeClass("hidden");
                next.addClass("hidden");
            } else {
                this.$el.find("#done").addClass("hidden");
                next.removeClass("hidden");
            }
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

            var steps = this.$el.find("#instruction-title");
            steps.html("Step " + (this.stepIndex+1) + " of " + (instructions.length));

            var container = this.$el.find("#instruction-container");
            container.empty();
            var compiledTemplate = this.instructionTemplate(instructions[this.stepIndex]);
            container.html(compiledTemplate);
            this.$el.find("#sbs-instruction-text").height(this.instructionTextHeight);

            this.highlightIngredients();
            this.updateStage(instructions[this.stepIndex]);
        },

        updateStage: function(currentInstruction) {
         /*   if (!this.appData.stagehi) { 
                return; 
            }*/

            if (this.lastStage != currentInstruction.stage) {
                var stagesContainer = this.$el.find("#stages-container");
                this.$el.find(".stage").removeClass("active");
                this.$el.find("#stage-" + currentInstruction.stage).addClass("active");
                this.lastStage = currentInstruction.stage;
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
