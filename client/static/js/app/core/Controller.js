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
    "views/SBSView",
    "views/SemanticView",
    "views/ColumnView"

], function (EventBus, Utils,
             StartView,
             NasaView,
             SurveyView,
             ThankYouView,

             SummaryView,
             ControlView, ResponsiveView, SBSView, SemanticView, ColumnView) {

    function Controller(){
        this.service = null;
        this.appData = null;
        this.currentView = null;
    }

    Controller.prototype.init = function(service, appData){
        this.service = service;
        this.appData = appData;

        EventBus.on("start", _.bind(this.initStartState, this));
        EventBus.on("startCompleted", _.bind(this.startCompleted, this));
        EventBus.on("summaryCompleted", _.bind(this.summaryCompleted, this));
        EventBus.on("blockCompleted", _.bind(this.blockCompleted, this));
        EventBus.on("nasaCompleted", _.bind(this.nasaCompleted, this));
        EventBus.on("surveyCompleted", _.bind(this.surveyCompleted, this));
        EventBus.on("logEvent", _.bind(this.logEvent, this));

    };

    Controller.prototype.initStartState = function(){
        var startState = this.appData.stateModel.get("state");
        switch(startState){
            case "start":
                this.displayStart();
                break;
            case "summary":
                this.startSummary();
                break;
            case "interface":
                this.startBlock();
                break;
            case "nasa":
                this.startNasa();
                break;
            case "survey":
                this.startSurvey();
                break;
            case "thankyou":
                this.startThankYou();
                break;
        }
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

        this.startSummary();
    };

    /*
    Controller.prototype.fetchData = function(){
        if(this.appData.recipe != null){
            this.service.search(this.appData.recipe, "any", _.bind(this.fetchDataComplete, this));
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
    */

    Controller.prototype.startSummary = function() {
        this.currentView = new SummaryView({model: this.appData.recipeModel});
        this.currentView.render();
        this.appData.stateModel.set("state", "summary");
    };

    Controller.prototype.summaryCompleted = function() {
        this.startBlock();
    };

    Controller.prototype.startBlock = function() {
        switch(this.appData.interface){
            case "control":
                this.currentView = new ControlView({model: this.appData.recipeModel, appData: this.appData});
                break;
            case "sbs":
                this.currentView = new SBSView({model: this.appData.recipeModel, appData: this.appData});
                break;
            case "responsive":
                this.currentView = new ResponsiveView({model: this.appData.recipeModel, appData: this.appData});
                break;
            case "semantic":
                this.currentView = new SemanticView({model: this.appData.recipeModel, appData: this.appData});
                break;
            case "col":
                this.currentView = new ColumnView({model: this.appData.recipeModel, appData: this.appData});
                break;
        }

        this.currentView.render();
        this.appData.stateModel.set("state", "interface");
    };

    Controller.prototype.blockCompleted = function(interfaceView){
        this.currentView.die();
        this.appData.subjectModel.set("completed", true);
        this.appData.subjectModel.save();
        this.startNasa();
    };

    Controller.prototype.startNasa = function(){
        console.log("startNasa");
        this.currentView = new NasaView({appData: this.appData});
        this.currentView.render();
        this.appData.stateModel.set("state", "nasa");
    };

    Controller.prototype.nasaCompleted = function(nasaView){
        console.log("nasaCompleted", nasaView.data);

        //subject model
        this.appData.subjectModel.set("nasa", nasaView.data);
        this.appData.subjectModel.save();

        var sData = this.appData.subjectModel.attributes;
        var data = {data: nasaView.data};
        var session = sData.session;
        data.group = sData.group;
        data.interface = this.appData.stateModel.get("interface");
        data.recipe = this.appData.stateModel.get("recipe");
        data.timestamp = (new Date()).toISOString();
        this.service.putData("nasas", session, data);

        this.currentView.remove();
        this.startThankYou();
        //this.startSurvey();
    };

    Controller.prototype.startSurvey = function(){
        console.log("startSurvey");
        this.currentView = new SurveyView({appData: this.appData});
        this.currentView.render();
        this.appData.stateModel.set("state", "survey");
    };

    Controller.prototype.surveyCompleted = function(surveyView){
        console.log("surveyCompleted");

        //subject model
        this.appData.subjectModel.set("survey", surveyView.data);
        this.appData.subjectModel.save();

        var sData = this.appData.subjectModel.attributes;
        var data = {data: surveyView.data};
        var session = sData.session;
        data.group = sData.group;
        data.interface = this.appData.stateModel.get("interface");
        data.recipe = this.appData.stateModel.get("recipe");
        data.timestamp = (new Date()).toISOString();
        this.service.putData("surveys", session, data);

        this.currentView.remove();
        this.startThankYou();
    };

    Controller.prototype.startThankYou = function(){
        this.currentView = new ThankYouView({appData: this.appData});
        this.currentView.render();

        this.appData.stateModel.set("state", "thankyou");
    };

    Controller.prototype.logEvent = function(log, blockView){
        console.log("log ", log);
        var sData = this.appData.subjectModel.attributes;
        var data = _.clone(log);
        var session = sData.session;
        data.group = sData.group;
        data.interface = this.appData.stateModel.get("interface");
        data.recipe = this.appData.stateModel.get("recipe");
        data.timestamp = (new Date()).toISOString();
        this.service.putData("logs", session, data);
    };

    return Controller;

});