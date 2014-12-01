define(
    [
        "models/BORModel",
        "core/Utils"
    ],
    function(BORModel, Utils) {

        var summaries = [
            "Combine dry ingredients.",
            "Combine wet ingredients.",
            "Whisk wet ingredients into dry ones to form batter.",
            "Ladle the batter into a heated pan.",
            "Add chocolate chips to the batter on the pan.",
            "Finish cooking both sides.",
            "Plate and garnish with toppings."
        ];

        var CuratedModel = BORModel.extend({

            localStorage: new Backbone.LocalStorage('nom.model.CuratedModel'),

            defaults: function() {
                return this.modifyBOR(BORModel.prototype.defaults.call(this));
            },

            parse: function(response, options){
                try {
                    return this.modifyBOR(response);
                } catch(e){
                    return this.modifyBOR(this.attributes);
                }
            },

            modifyBOR: function(data){
                data.CuratedInstructions = [];
                var instructions = data.Instructions.split("\r\n");
                var count = 0;
                for(var i=-1;++i<instructions.length;){
                    var rawInstruction = instructions[i];
                    if(rawInstruction == null || rawInstruction.length === 0){
                        continue;
                    }
                    count += 1;
                    var cleanedInstruction = Utils.cleanInstruction(rawInstruction);
                    var summary = summaries[i];
                    var instruction = {index: count, text: cleanedInstruction, summary: summary};
                    data.CuratedInstructions.push(instruction);
                }
                return data;
            }

        });

        return CuratedModel;

});
