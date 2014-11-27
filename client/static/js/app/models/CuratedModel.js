define(["models/ParsedBORModel"], function (ParsedBORModel) {

    //just subclass ParsedBORModel for now...
    var CuratedModel = ParsedBORModel.extend({
    //var CuratedModel = Backbone.Model.extend({

        localStorage: new Backbone.LocalStorage('nom.model.CuratedModel'),

    });

    return CuratedModel;

});
