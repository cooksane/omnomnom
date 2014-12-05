define([
    "core/EventBus",
    "core/Utils",
    "views/InterfaceViewBase"
], function(EventBus, Utils, InterfaceViewBase) {

    return InterfaceViewBase.extend({

        className: "",
        template: nom.templates.RecipeControl,
        ingredientTemplate: nom.templates.Ingredient,
        instructionTemplate: nom.templates.InstructionControl,

        events: {
            "click #done": 'recipeComplete',
            "click": "onClick"
        },

        initialize: function(){
            console.log("ControlView.initialize");
            _.bindAll(this, 'onKey');
            $(document).bind('keyup', this.onKey);
        },

        die: function(){
            $(document).unbind('keyup', this.onKey);
            this.undelegateEvents();
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
            this.stepIndex = -1;
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
            var instructions = result.CuratedInstructions;
            var container = this.$el.find("#instruction-container");
            for(var i=-1;++i<instructions.length;){
                var compiledTemplate = this.instructionTemplate(instructions[i]);
                container.append(compiledTemplate);
            }
        }

    });

});
