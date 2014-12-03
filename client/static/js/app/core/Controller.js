define([
    "core/EventBus",
    "core/Utils",

    "views/StartView",
    "views/NasaView",
    "views/SurveyView",
    "views/ThankYouView",

    "views/SummaryView",
    "views/ControlView",
    "views/ResponsiveView",
    "views/SBSView"

], function (EventBus, Utils,
             StartView,
             NasaView,
             SurveyView,
             ThankYouView,

             SummaryView,
             ControlView, ResponsiveView, SBSView) {

    function Controller(){
        this.service = null;
        this.appData = null;
        this.currentView = null;
    }

    Controller.prototype.init = function(service, appData){
        this.service = service;
        this.appData = appData;

        //EventBus.on("start", _.bind(this.displayStart, this));
        EventBus.on("start", _.bind(this.fetchData, this));
        EventBus.on("startCompleted", _.bind(this.startCompleted, this));
        EventBus.on("SummaryView:continue", _.bind(this.summaryCompleted, this));
    };

    Controller.prototype.displayStart = function(){
        console.log("displayStart");
        this.currentView = new StartView({appData: this.appData});
        this.currentView.render();
        this.appData.stateModel.set("state", "start");
    };

    Controller.prototype.startCompleted = function(){
        this.currentView.remove();

        this.appData.subjectModel.set("started", true);
        this.appData.subjectModel.save();

        this.fetchData();
    };

    Controller.prototype.fetchData = function(){
        if(this.appData.recipeName != null){
            this.service.search(this.appData.recipeName, "any", _.bind(this.fetchDataComplete, this));
        } else {
            this.startSummary();
        }
    };

    Controller.prototype.fetchDataComplete = function(err, response){
        console.log('fetchDataComplete', err, response);
        this.appData.parsedBorModel.set(response.result);
        this.appData.parsedBorModel.save(response.result);
        this.startSummary();
    };

    Controller.prototype.startSummary = function() {
        this.currentView = new SummaryView({model: this.appData.curatedModel});
        this.currentView.render();
    };

    Controller.prototype.summaryCompleted = function() {
        this.startBlock();
    };

    Controller.prototype.startBlock = function() {
        switch(this.appData.interface){
            case "control":
                this.currentView = new ControlView({model: this.appData.curatedModel});
                break;
            case "sbs":
                this.currentView = new SBSView({model: this.appData.curatedModel});
                break;
            case "responsive":
                this.currentView = new ResponsiveView({model: this.appData.curatedModel});
                break;
        }

        this.currentView.render();
    };

    return Controller;

});