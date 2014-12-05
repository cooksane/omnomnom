define([
    "models/StateModel",
    "models/SubjectModel",
    "models/curated/CuratedEggsModel",
    "models/curated/CuratedLasagnaModel",
    "models/curated/CuratedRisottoModel"
],

    function (StateModel, SubjectModel,
              CuratedEggsModel, CuratedLasagnaModel, CuratedRisottoModel) {

        return {

            stateModel: null,
            subjectModel: null,
            recipeModel: null,

            curatedRecipeMap: {
                "eggs": new CuratedEggsModel({id: "nom.model.CuratedEggsModel"}),
                "lasagna": new CuratedLasagnaModel({id: "nom.model.CuratedLasagnaModel"}),
                "risotto": new CuratedRisottoModel({id: "nom.model.CuratedRisottoModel"})
            },

            recipe: "eggs", //eggs, lasagna, risotto
            interface: "control", // control, sbs, responsive
            stateValue: "summary", // start, summary, interface, nasa, survey, thankyou

            inghi: true,

            init: function(state){

                //state model
                this.stateModel = new StateModel({id: "nom.model.StateModel"});

                //recipe
                var recipe = state.getQueryParamByName("recipe");
                if(this.curatedRecipeMap.hasOwnProperty(recipe)){
                    this.recipe = recipe;
                }
                this.stateModel.set("recipe", this.recipe);

                //interface
                var interface = state.getQueryParamByName("interface");
                if(interface != null){
                    this.interface = interface;
                }
                this.stateModel.set("interface", this.interface);

                //state
                var stateValue = state.getQueryParamByName("state");
                if(stateValue != null){
                    this.stateValue = stateValue;
                }
                this.stateModel.set("state", this.stateValue);

                //Ingredient Highlighting
                var inghi = state.getQueryParamByName("inghi");
                if(inghi != null){
                    this.inghi = !Boolean(inghi === "0");
                    this.stateModel.set("inghi", inghi);
                }

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

                if(this.curatedRecipeMap.hasOwnProperty(this.recipe)){
                    this.recipeModel = this.curatedRecipeMap[this.recipe];
                } else {
                    this.recipeModel = this.curatedRecipeMap["eggs"];
                }

                if (resetSession) {
                    this.recipeModel.save();
                } else {
                    this.recipeModel.fetch();
                }

            }

        };
    }
);