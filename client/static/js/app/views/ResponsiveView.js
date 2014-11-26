define([
    "core/EventBus",
    "core/Utils"
], function(EventBus, Utils) {

    return Backbone.View.extend({

        className: "row",
        template: nom.templates.RecipeResponsive,

        events: {
        },

        initialize: function(){
            console.log("ResponsiveView.initialize", this.model);
        },

        die: function(){
            this.removeAllListeners();
            this.remove();
        },

        render: function(){
            console.log("ResponsiveView.render", this.model);
            var compiledTemplate = this.template();
            this.$el.html(compiledTemplate);
            $("#main-container").html(this.el);
        }

    });

});
