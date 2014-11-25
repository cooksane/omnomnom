define([
    "core/EventBus",
    "core/Utils",

    "views/StartView",
    "views/NasaView",
    "views/SurveyView",
    "views/ThankYouView",

    "views/SummaryView",
    "views/ControlView",
    "views/ResponsiveView"

], function (EventBus, Utils,
             StartView,
             NasaView,
             SurveyView,
             ThankYouView,
             SummaryView, ControlView, ResponsiveView) {

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
        //this.currentView.initialize({subjectModel: this.subjectModel});
        this.currentView.render();
        this.stateModel.set("state", "start");
    };

    Controller.prototype.startCompleted = function(){
        this.currentView.remove();

        this.subjectModel.set("started", true);
        this.subjectModel.save();

        this.fetchData();
    };

    Controller.prototype.fetchData = function(){
        if(this.appData.recipeName == null){
            this.service.search(this.appData.recipeName, "any", _.bind(this.fetchDataComplete, this));
        } else {
            this.startSummary();
        }
    };

    Controller.prototype.fetchDataComplete = function(err, response){
        console.log('fetchDataComplete', err, response);
        this.appData.borModel.set(response.result);
        this.appData.borModel.save();
        this.startSummary();
    };

    Controller.prototype.startSummary = function() {
        this.currentView = new SummaryView({model: this.appData.borModel});
        this.currentView.render();
    };

    Controller.prototype.summaryCompleted = function() {
        this.startBlock();
    };

    Controller.prototype.startBlock = function() {
        this.currentView = new ControlView({model: this.appData.borModel});
        this.currentView.render();
    };

    return Controller;

});