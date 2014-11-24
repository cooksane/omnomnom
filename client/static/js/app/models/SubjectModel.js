define(["core/Utils"],
    function (Utils) {

    var SubjectModel = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('nom.model.SubjectModel'),
        defaults: function() {
            return {
                session: Utils.getSubjectId(),
                started: false,
                group: 0,
                nasas: [],
                survey: null
            };
        }
    });

    return SubjectModel;

});
