define([
    "models/StateModel",
    "models/SubjectModel",
    "models/BORModel",
    "models/ParsedBORModel",
    "models/CuratedModel"
],

    function (StateModel, SubjectModel, BORModel, ParsedBORModel, CuratedModel) {

        return {

            stateModel: null,
            subjectModel: null,
            borModel: null,

            recipeName: null,
            interface: "control", // control, sbs, responsive

            init: function(state){

                //state model
                this.stateModel = new StateModel({id: "nom.model.StateModel"});

                //recipe
                var recipe = state.getQueryParamByName("recipe");
                if(recipe != null){
                    this.recipeName = recipe;
                }

                //interface
                //this.interface =
                var interface = state.getQueryParamByName("interface");
                if(interface != null){
                    this.interface = interface;
                }
                this.stateModel.set("interface", this.interface);

                //debug flag
                var debug = state.getQueryParamByName("debug");
                if(debug == "1"){
                    this.stateModel.set("debug", "1");
                }

                var initGroup = state.getQueryParamByName("group");
                if(initGroup != null){
                    initGroup = parseInt(initGroup);
                    //console.log("group", initGroup, typeof(initGroup));
                    this.stateModel.set("group", initGroup);
                }

                //subject model
                this.subjectModel = new SubjectModel({id: "nom.model.SubjectModel"});

                var resetSession = state.getQueryParamByName("reset");
                if(resetSession == null && debug == null){
                    this.subjectModel.fetch();
                }
                this.subjectModel.save();

                this.stateModel.set("session", this.subjectModel.get("session"));
                this.stateModel.save();

                this.subjectModel.set("group", this.stateModel.get("group"));

                //BigOven Model
                this.borModel = new BORModel({id: "nom.model.BORModel"});

                //Parsed BigOven Model
                this.parsedBorModel = new ParsedBORModel({id: "nom.model.ParsedBORModel"});

                //Curated Model
                this.curatedModel = new CuratedModel({id: "nom.model.CuratedModel"});

                if (resetSession) {
                    this.parsedBorModel.save();
                    this.borModel.save();
                    this.curatedModel.save();
                } else {
                    this.parsedBorModel.fetch();
                    this.borModel.fetch();
                    this.curatedModel.fetch();
                }

            }

        };
    }
);