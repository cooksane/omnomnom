define([
    "models/StateModel",
    "models/SubjectModel",
    "models/BORModel"
    ],
    function (StateModel, SubjectModel, BORModel) {

        return {

            stateModel: null,
            subjectModel: null,
            borModel: null,
            recipeName: "Lasagna",

            init: function(state){

                //state model
                this.stateModel = new StateModel({id: "nom.model.StateModel"});

                var recipe = state.getQueryParamByName("recipe");
                if(recipe != null){
                    this.recipeName = recipe;
                }

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

            }

        };
    }
);