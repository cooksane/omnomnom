define([
    "core/State",
    "core/Controller",
    "core/EventBus",
    "services/Service",
    "core/Utils",
    "core/AppData"
    ], function(State, Controller, EventBus, Service, Utils,
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

        this.appData = AppData;
        this.appData.init(this.state);
        
        this.state.init(this.appData.stateModel);
        this.controller.init(this.service, this.appData);

        this.state.setState(this.appData.stateModel);

        EventBus.trigger("start", this);
    };

    return Main;

});
