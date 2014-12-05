define([
    "core/EventBus",
    "core/Utils"
], function(EventBus, Utils) {

    return Backbone.View.extend({

        className: "",
        template: nom.templates.Nasa,

        events: {
            "click input": "inputClick",
            "click #next": "nextClicked"
        },

        data: {},

        initialize: function(params){
            console.log("NasaView.initialize");
        },

        die: function(){
            this.removeAllListeners();
        },

        render: function(){
            console.log("NasaView.render");
            //var compiledTemplate = this.template(this.model.attributes);
            var compiledTemplate = this.template();
            this.$el.html(compiledTemplate);
            $("#main-container").html(this.el);
        },

        inputClick: function(target){
            var inputs = this.$el.find("input");
            var typesOk = {};
            for(var i=-1;++i<inputs.length;){
                var input = $(inputs[i]);
                var name = input.attr("name");
                var checked = input[0].checked;
                if(checked){
                    this.data[name] = parseInt(input.val());
                }
                if(typesOk[name] !== true){
                    typesOk[name] = checked;
                }
            }
            var check = true;
            for(var n in typesOk){
                console.log(n, typesOk[n]);
                check &= typesOk[n];
            }
            console.log("check", check);
            if(check){
                this.$el.find("#next").attr("disabled", null);
            }
        },

        nextClicked: function(target){
            EventBus.trigger("nasaCompleted", this);
        }

    });

});
