define(
    [
        "models/BORModel",
        "core/Utils"
    ],
    function(BORModel, Utils) {

    var ParsedBORModel = BORModel.extend({

        localStorage: new Backbone.LocalStorage('nom.model.ParsedBORModel'),

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
                var summary = cleanedInstruction.substr(0, cleanedInstruction.length*0.4)+"...";
                var instruction = {index: count, text: cleanedInstruction, summary: summary};
                data.CuratedInstructions.push(instruction);
            }
            return data;
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

    return ParsedBORModel;

});