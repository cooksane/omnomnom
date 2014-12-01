define([
    "core/EventBus",
    "core/Utils"
], function(EventBus, Utils) {

    return Backbone.View.extend({
        template: nom.templates.RecipeSBS,
        ingredientTemplate: nom.templates.Ingredient,
        instructionTemplate: nom.templates.InstructionSBS,

        events: {
            "click #prev": "prevClicked",
            "click #next": "nextClicked"
        },

        stepIndex: 0,

        initialize: function(){
            console.log("SBSView.initialize");
        },

        die: function(){
            this.removeAllListeners();
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

        prevClicked: function(){
            var instructions = this.model.get("CuratedInstructions");
            if(this.stepIndex > 0){
                this.stepIndex -= 1;
                this.renderInstruction();
                this.updateButtons();
            }
        },

        nextClicked: function(){
            var instructions = this.model.get("CuratedInstructions");
            if(this.stepIndex < instructions.length-1){
                this.stepIndex += 1;
                this.renderInstruction();
                this.updateButtons();
            }
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

           // var title = this.$el.find("#instruction-title");
          // title.html("Step " + (this.stepIndex+1) + " of " + (instructions.length));
            var steps = this.$el.find("#sbs-nav-step");
            steps.html("Step " + (this.stepIndex+1) + " of " + (instructions.length));

            var container = this.$el.find("#instruction-container");
            container.empty();
            var compiledTemplate = this.instructionTemplate(instructions[this.stepIndex]);
            container.html(compiledTemplate);
        }

    });

});
