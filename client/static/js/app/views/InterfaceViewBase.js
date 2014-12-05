define([
    "core/EventBus",
    "core/Utils"
], function(EventBus, Utils) {

    return Backbone.View.extend({

        className: "",

        events: {
            "click #done": 'recipeComplete'
        },

        appData: null,

        lastIndex: -1,
        stepIndex: 0,

        startTime: new Date(),
        stepTime: new Date(),
        lastInteractionTime: new Date(),

        initialize: function(){
            console.log("InterfaceViewBase.initialize");
        },

        die: function(){
            this.removeAllListeners();
            this.remove();
        },

        render: function(){
            console.log("ControlView.render");
            this.renderTemplate();
            this.renderModel();
        },

        renderTemplate: function(){
            var recipe = this.model.attributes;
            var compiledTemplate = this.template(recipe);
            this.$el.html(compiledTemplate);
            $("#main-container").html(this.el);
        },

        onClick: function(event){
            this.updateLog("unknownClick", false);
        },

        onKey: function(e) {
            var code = e.keyCode || e.which;
            if (code == 39) { // right arrow
                this.updateLog("rightKey", false);
            } else if (code == 37) {  // left arrow
                this.updateLog("leftKey", false);
            } else if (code == 38) { // up arrow
                this.updateLog("upKey", false);
            } else if (code == 40) {  // down arrow
                this.updateLog("downKey", false);
            } else {
                this.updateLog("unknownKey", false);
            }
        },

        recipeComplete: function(event){
            event.stopImmediatePropagation();
            this.updateLog("doneClick", false);
            EventBus.trigger("blockCompleted", this);
        },

        updateLog: function(interaction, stepChanged){

            var time = new Date();
            var stepDuration = time - this.stepTime;
            var stepDelta = stepChanged? this.stepIndex - this.lastIndex : 0;


            var intentMap = {
                "doneClick": "done",
                "unknownKey": "unknown", "unknownClick": "unknown",
                "upKey": "prevStep", "leftKey": "prevStep", "prevClick": "prevStep",
                "downKey": "nextStep", "rightKey": "nextStep", "nextClick": "nextStep",
                "instructionClick": "setStep"
            };

            var intent = "unknown";
            if(intentMap.hasOwnProperty(interaction)){
                intent = intentMap[interaction];
            }

            var intentSuccess = (intent == "prevStep" && stepDelta == -1) ||
                                (intent == "nextStep" && stepDelta == 1) ||
                                (intent == "done" && stepDelta === 0) ||
                                (intent == "setStep" && this.stepIndex !== this.lastIndex);

            var log = {
                // instructionClick, prevClick, nextClick, unknownClick, doneClick
                // upKey, leftKey, downKey, rightKey, unknownKey
                interaction: interaction,
                interactionDelta: time - this.lastInteractionTime, // duration since last interaction

                // unknown, setStep, prevStep, nextStep, done
                intent: intent, //what was the user trying to do?
                intentSuccess: intentSuccess, //did the UI do what the user intended?

                stepDelta: stepDelta, // +1, -1, 0, or something in [0, n-1]
                step: this.stepIndex - stepDelta + 1, // step on which event occurred
                stepDuration: stepDuration, // duration spent on stepIndex
                totalDuration: time - this.startTime, // total duration
                highlightIngredients: this.appData.inghi // is ingredient highlighting on or off?
            };

            if(stepChanged){
                // step change
                this.stepTime = time; // update step time
            } else {
                // no change
            }

            this.lastInteractionTime = time;

            EventBus.trigger("logEvent", log, this);
        }

    });

});
