define([
    "core/EventBus",
    "core/Utils",

    "views/StartView",
    "views/NasaView",
    "views/SurveyView",
    "views/ThankYouView",
    "views/ControlView"

], function (EventBus, Utils,
             StartView, NasaView, SurveyView, ThankYouView,
             ControlView) {

    function Controller(){
        this.stateModel = null;
        this.subjectModel = null;
        this.service = null;
        this.appData = null;
        this.currentView = null;
    }

    Controller.prototype.init = function(stateModel, subjectModel, service, appData){
        this.stateModel = stateModel;
        this.subjectModel = subjectModel;
        this.service = service;
        this.appData = appData;

        EventBus.on("start", _.bind(this.displayStart, this));
        EventBus.on("startCompleted", _.bind(this.startCompleted, this));
    };

    Controller.prototype.displayStart = function(){
        console.log("displayStart");
        this.currentView = new StartView({subjectModel: this.subjectModel});
        this.currentView.initialize({subjectModel: this.subjectModel});
        this.currentView.render();
        this.stateModel.set("state", "start");
    };

    Controller.prototype.startCompleted = function(){
        this.currentView.remove();

        this.subjectModel.set("started", true);
        this.subjectModel.save();

        this.startBlock();
    };

    Controller.prototype.startBlock = function() {

        function fetchData(){
            fetchDataComplete();
        }

        function fetchDataComplete(err, results){
            start();
        }

        function start(){
            console.log("startBlock");
            this.currentView = new ControlView();
            this.currentView.initialize();
            this.currentView.render();
        }

        fetchData();
    };

    return Controller;

});