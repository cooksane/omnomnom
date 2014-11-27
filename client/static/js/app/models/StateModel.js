// state = start, experiment, nasa, survey, thankyou

define([], function () {

    var StateModel = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('nom.model.StateModel'),
        defaults: function() {
            return {
                session: "",
                state: "start",
                group: 0,
                interface: "sbs"
                //this should be hidden if not set
                //debug: false
            };
        }
    });

    return StateModel;

});
