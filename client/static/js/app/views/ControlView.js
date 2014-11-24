define([
    "core/EventBus",
    "core/Utils"
], function(EventBus, Utils) {

    return Backbone.View.extend({

        className: "row",
        template: nom.templates.Control,

        events: {
        },

        initialize: function(){
        },

        die: function(){
            this.removeAllListeners();
            this.remove();
        },

        render: function(){
            console.log("ControlView.render");
            var compiledTemplate = this.template();
            this.$el.html(compiledTemplate);
            $("#main-container").html(this.el);
        }

    });

});
