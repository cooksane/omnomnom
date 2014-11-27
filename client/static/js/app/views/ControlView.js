define([
    "core/EventBus",
    "core/Utils"
], function(EventBus, Utils) {

    return Backbone.View.extend({

        className: "",
        template: nom.templates.RecipeControl,
        ingredientTemplate: nom.templates.Ingredient,
        instructionTemplate: nom.templates.InstructionControl,

        events: {
        },

        initialize: function(){
            console.log("ControlView.initialize");
        },

        die: function(){
            this.removeAllListeners();
            this.remove();
        },

        render: function(){
            console.log("ControlView.render");
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
            //this.renderInstructionsSimple();
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

        renderInstructionsSimple: function(){
            var result = this.model.attributes;
            var instructions = result.Instructions.split("\r\n");
            var container = this.$el.find("#instruction-container");
            var finalInstructions = [];
            for(var i=-1;++i<instructions.length;){
                var rawInstruction = instructions[i];
                if(rawInstruction == null || rawInstruction.length === 0){
                    continue;
                }
                finalInstructions.push(rawInstruction);
            }
            container.html("<p>"+finalInstructions.join("<br>")+"</p>");
        },

        renderInstructions: function(){
            var result = this.model.attributes;
            var instructions = result.ParsedInstructions;
            var container = this.$el.find("#instruction-container");
            for(var i=-1;++i<instructions.length;){
                var compiledTemplate = this.instructionTemplate(instructions[i]);
                container.append(compiledTemplate);
            }
        }

    });

});
