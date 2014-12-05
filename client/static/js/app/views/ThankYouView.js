define([
    "core/EventBus",
    "core/Utils"
], function(EventBus, Utils) {

    return Backbone.View.extend({

        className: "",
        template: nom.templates.ThankYou,

        events: {

        },

        appData: null,

        initialize: function(params){
            this.appData = params.appData;
        },

        render: function(){
            //var compiledTemplate = this.template(this.model.attributes);
            var session = this.appData.subjectModel.get("session");
            var compiledTemplate = this.template({session: session});
            this.$el.html(compiledTemplate);
            $("#main-container").html(this.el);
        }

    });

});
