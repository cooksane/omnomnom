
define([], function () {

    var StateModel = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('nom.model.StateModel'),
        defaults: function() {
            return {
                session: "",
                group: 1,
                state: "summary", // start, summary, interface, nasa, survey, thankyou
                interface: "control", // control, sbs, responsive
                recipe: "eggs" // eggs, lasagna, risotto

                // this should be hidden if not set
                // debug: false
            };
        }
    });

    return StateModel;

});
