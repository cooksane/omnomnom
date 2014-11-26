define([
    "core/EventBus",
    "core/Utils"
], function(EventBus, Utils) {

    return Backbone.View.extend({

        el: $("#main-container"),
        template: nom.templates.ThankYou,

        events: {
        },

        session: null,

        initialize: function(params){
            this.session = params.session;
        },

        render: function(){
            //var compiledTemplate = this.template(this.model.attributes);
            var compiledTemplate = this.template({session: this.session});
            this.$el.html(compiledTemplate);
        }

    });

});
