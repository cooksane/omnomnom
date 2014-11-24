define([
    "core/EventBus",
    "core/Utils"
], function(EventBus, Utils) {

    return Backbone.View.extend({

        template: nom.templates.Start,

        events: {
            "click #next": "nextClicked"
        },

        subjectModel: null,
        started: false,

        initialize: function(params){
            this.subjectModel = params.subjectModel;
            this.started = this.subjectModel.get("started");
            console.log("StartView.initialize", this.subjectModel.attributes);
        },

        render: function(){
            console.log("StartView.render");
            //var compiledTemplate = this.template(this.model.attributes);
            var compiledTemplate = this.template({started: this.started});
            this.$el.html(compiledTemplate);
            $("#main-container").html(this.el);
        },

        nextClicked: function(target){
            console.log("nextClicked", target);
            EventBus.trigger("startCompleted", this);
        }

    });

});
