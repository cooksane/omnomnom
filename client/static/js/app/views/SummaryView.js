define([
    "core/EventBus",
    "core/Utils"
], function(EventBus, Utils) {

    return Backbone.View.extend({

        className: "row",
        template: nom.templates.RecipeSummary,

        events: {
            "click #continue": "continueClicked"
        },

        initialize: function(){
            console.log("SummaryView.initialize", this.model);
        },

        die: function(){
            this.removeAllListeners();
            this.remove();
        },

        render: function(){
            console.log("SummaryView.render", this.model);
            var compiledTemplate = this.template(this.model.attributes);
            this.$el.html(compiledTemplate);
            $("#main-container").html(this.el);
        },

        continueClicked: function(event){
            EventBus.trigger("SummaryView:continue", this);
        }

    });

});
