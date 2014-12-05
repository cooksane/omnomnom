define(["core/Utils"],
    function (Utils) {

    var SubjectModel = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('nom.model.SubjectModel'),
        defaults: function() {
            return {
                session: Utils.getSubjectId(),
                started: false,
                completed: false,
                group: 1,
                nasa: null,
                survey: null
            };
        }
    });

    return SubjectModel;

});
