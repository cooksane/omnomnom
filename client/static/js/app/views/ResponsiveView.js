define([
    "core/EventBus",
    "core/Utils"
], function(EventBus, Utils) {

    return Backbone.View.extend({

        className: "full-vertical",
        template: nom.templates.RecipeResponsive,
        ingredientTemplate: nom.templates.Ingredient,
        instructionTemplate: nom.templates.InstructionResponsive,

        events: {
            "click #prev": "prevClicked",
            "click #next": "nextClicked"
        },

        viewLookup: [],
        lastIndex: null,
        stepIndex: 0,

        initialize: function(){
            console.log("ResponsiveView.initialize");
        },

        die: function(){
            this.removeAllListeners();
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
                this.lastIndex = this.stepIndex;
                this.stepIndex -= 1;
                this.selectInstruction();
                this.updateButtons();
            }
        },

        nextClicked: function(){
            var instructions = this.model.get("CuratedInstructions");
            if(this.stepIndex < instructions.length-1){
                this.lastIndex = this.stepIndex;
                this.stepIndex += 1;
                this.selectInstruction();
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


        renderInstructions: function(){
            var result = this.model.attributes;
            var instructions = result.CuratedInstructions;
            var container = this.$el.find("#instruction-container");
            for(var i=-1;++i<instructions.length;){
                var compiledTemplate = this.instructionTemplate(instructions[i]);
                this.viewLookup.push(compiledTemplate);
                container.append(compiledTemplate);
            }
        },

        selectView: function(select, index){
            var instructions = this.model.get("CuratedInstructions");
            var targetInstruction = instructions[index];
            //var targetView = this.viewLookup[index];
            var targetView = this.$el.find("#instruction_"+(index+1));
            var targetHTML = targetView.find("#instruction-text");
            if(select){
                targetView.addClass("bg-success");
                targetHTML.html(targetInstruction.text);
            } else {
                targetView.removeClass("bg-success");
                targetHTML.html(targetInstruction.summary);
            }

        },

        selectInstruction: function(){
            this.selectView(true, this.stepIndex);
            if(this.lastIndex != null){
                this.selectView(false, this.lastIndex);
            }
        }

    });

});
