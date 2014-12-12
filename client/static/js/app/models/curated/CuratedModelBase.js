/* source: http://smittenkitchen.com/blog/2014/04/baked-eggs-with-spinach-and-mushrooms/ */

define(
    [
        "core/Utils"
    ],
    function(Utils) {

        var CuratedModel = Backbone.Model.extend({

            localStorage: new Backbone.LocalStorage('nom.model.CuratedModelBase'),

            summaries: [],
            instructions: [],

            // Map index of an instruction to recipes used in that instruction.
            ingredientIndexes: [],
            stageIndexes: [],

            imageURLs: [],

            recipe: {},

            defaults: function() {
                return this.curateRecipe(this.recipe);
            },

            parse: function(response, options){
                try {
                    return this.curateRecipe(response);
                } catch(e){
                    return this.curateRecipe(this.attributes);
                }
            },

            curateRecipe: function(data){
                console.log(data);
                if(this.tools){
                    data.Tools = this.tools;
                }
                if(this.stages){
                    data.Stages = this.stages;
                }
                data.CuratedInstructions = [];
                for (var i=-1; ++i < this.instructions.length; ){
                    var instruction = {
                        index: i+1,
                        text: this.instructions[i],
                        //summary: this.summaries[i].split(" ").slice(0, 10).join(" ")+"...",
                        summary: this.summaries[i],
                        stage: this.stageIndexes[i],
                        imageURL: this.imageURLs[i],
                        ingredientIndexes: this.ingredientIndexes[i]
                    };
                    data.CuratedInstructions.push(instruction);
                }
                return data;
            }

        });

        return CuratedModel;
});
