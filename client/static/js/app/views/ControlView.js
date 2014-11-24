define([
    "core/EventBus",
    "core/Utils"
], function(EventBus, Utils) {

    return Backbone.View.extend({

        className: "",
        template: nom.templates.RecipeControl,
        ingredientTemplate: nom.templates.Ingredient,
        instructionTemplate: nom.templates.InstructionSimple,

        events: {
        },

        initialize: function(){
            console.log("ControlView.initialize", this.model);
        },

        die: function(){
            this.removeAllListeners();
            this.remove();
        },

        render: function(){
            console.log("ControlView.render", this.model);
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
            var instructions = result.Instructions.split("\r\n");
            var container = this.$el.find("#instruction-container");
            var count = 0;
            for(var i=-1;++i<instructions.length;){
                var rawInstruction = instructions[i];
                if(rawInstruction == null || rawInstruction.length === 0){
                    continue;
                }
                var cleanedInstruction = this.cleanInstruction(rawInstruction);
                count += 1;
                var instruction = {index: count, text: cleanedInstruction};
                var compiledTemplate = this.instructionTemplate(instruction);
                container.append(compiledTemplate);
            }
        },

        cleanInstruction: function(instruction){
            var trim = function(s){return s.replace(/^\s+|\s+$/g, '');};
            var ltrim = function(s){return s.replace(/^\s+/,'');};
            var rtrim = function(s){return s.replace(/\s+$/,'');};
            var fulltrim = function(s){return s.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};

            var trimNum = function(s){return s.replace(/([0-9]+\.)/g, '');};

            return trim(trimNum(instruction));
        }

    });

});
