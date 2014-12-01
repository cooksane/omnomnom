
define(["core/EventBus"],
    function (EventBus) {

        var State = function () {
            this.stateModel = null;
        };

        State.prototype.init = function (stateModel) {
            this.stateModel = stateModel;
            //this.stateModel.on("reset", _.bind(this.setState, this));
            this.stateModel.on("change", _.bind(this.pushState, this));

            History.Adapter.bind(window, 'statechange', _.bind(this.browserStateChange, this));
        };

        State.prototype.browserStateChange = function () {
            var historyState = History.getState();
            console.log("State.browserStateChange", historyState.data.state);
            this.stateModel.set(historyState.data);
            this.stateModel.save();
        };

        State.prototype.toStateParams = function(stateModel){
            var state = _.clone(stateModel.attributes);
            delete state['id'];
            var qs = $.param(state);
            var params = [state, "Omnomnom - Machine-Assisted Cooking", "?" + qs];
            return params;
        };

        State.prototype.pushState = function(stateModel){
            stateModel.save();
            History.pushState.apply(History, this.toStateParams(stateModel));
        };

        State.prototype.setState = function(stateModel){
            History.replaceState.apply(History, this.toStateParams(stateModel));
        };

        State.prototype.getState = function() {
            return History.getState();
        };

        State.prototype.getQueryParamByName = function(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results == null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
        };

        /*
        History.pushState({state:1}, "State 1", "?state=1"); // logs {state:1}, "State 1", "?state=1"
        History.pushState({state:2}, "State 2", "?state=2"); // logs {state:2}, "State 2", "?state=2"
        History.replaceState({state:3}, "State 3", "?state=3"); // logs {state:3}, "State 3", "?state=3"
        History.pushState(null, null, "?state=4"); // logs {}, '', "?state=4"
        History.back(); // logs {state:3}, "State 3", "?state=3"
        History.back(); // logs {state:1}, "State 1", "?state=1"
        History.back(); // logs {}, "Home Page", "?"
        History.go(2); // logs {state:3}, "State 3", "?state=3"
        */

        return State;

});