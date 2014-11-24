define([
    "models/StateModel",
    "models/SubjectModel",
    "core/State",
    "core/Controller",
    "core/EventBus",
    "services/Service",
    "core/Utils",
    "core/AppData"
    ], function(StateModel, SubjectModel,
                State, Controller, EventBus, Service, Utils,
                AppData) {

    var Main = function(){
        this.stateModel = null;
        this.subjectModel = null;
        this.state = null;
        this.controller = null;
        this.service = null;
        this.appData = null;
    };

    Main.prototype.init = function(){
        console.log("Main.init");

        document.main = this;

        this.service = new Service();
        this.controller = new Controller();
        this.state = new State();

        //state model
        this.stateModel = new StateModel({id: "model.StateModel"});

        var debug = this.state.getQueryParamByName("debug");
        if(debug == "1"){
            this.stateModel.set("debug", "1");
        }

        var initGroup = this.state.getQueryParamByName("group");
        if(initGroup != null){
            initGroup = parseInt(initGroup);
            //console.log("group", initGroup, typeof(initGroup));
            this.stateModel.set("group", initGroup);
        }

        //subject model
        this.subjectModel = new SubjectModel({id: "model.SubjectModel"});

        var resetSession = this.state.getQueryParamByName("reset");
        if(resetSession == null && debug == null){
            this.subjectModel.fetch();
        }
        this.subjectModel.save();

        this.stateModel.set("session", this.subjectModel.get("session"));
        this.stateModel.save();

        this.subjectModel.set("group", this.stateModel.get("group"));
        this.appData = AppData.init(this.stateModel.get("group"));
        
        this.state.init(this.stateModel);
        this.controller.init(this.stateModel, this.subjectModel, this.service, this.appData);

        this.state.setState(this.stateModel);
        //this.stateModel.set("state", "x");
        //this.state.pushState(this.stateModel);

        EventBus.trigger("start", this);
        //$("#start-container").removeClass("active");
        //this.controller.startSurvey();

        //$("#start-container").removeClass("active");
        //this.controller.displayThankYou();

        //var data = this.subjectModel.attributes;
        //this.service.submitLog(data.session, data);

    };

    return Main;

});
