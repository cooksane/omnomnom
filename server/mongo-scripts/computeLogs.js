var conn = new Mongo();
var db = conn.getDB("omnomnom");

function aggregateSessionResults(session, recipe, interface, excludeUnknown){

    /*
    var session = "5511517ce047964b623ec6906885690eeacbda56";
    var recipe = "risotto";
    var interface = "sbs";
    */

    var group = null;
    var highlightIngredients = null;

    var collection = "logs";
    var collHandle = db[collection];
    var query = {
        session: session
        , recipe: recipe
        , interface: interface
    };

    if(excludeUnknown){
        query['intent'] = {$ne: "unknown"};
    }

    //printjson(collHandle.count(query));

    var cursor = collHandle
        .find(query)
        .sort({_id: 1});

    //printjson(cursor);

    //fields:
    /*
     interaction
     interactionDelta
     intent
     intentSuccess
     stepDelta
     step
     stepDuration
     totalDuration
     highlightIngredients
     group
     interface
     recipe
     timestamp
     session
     _id
     */

    //metrics
    function interactionM(){
        return {
            count: 0,
            totalDuration: 0,
            //averageTimeElapsedPerUsage: 0,
            rate: 0 //the number of times this interaction was used per minute
        };
    }

    function intentM(){
        return {
            count: 0,
            success: 0,
            fail: 0,
            rate: 0, //the number of times this intent was used per minute
            successRate: 0, //the number of times this intent succeeded per minute
            failureRate: 0 //the number of times this intent failed per minute
        };
    }

    function stepM(){
        return {
            totalDuration: 0,
            numViews: 0,
            averageDuration: 0
        }
    }

    var results = {
        interaction: {
            "startClick": interactionM(),
            "doneClick": interactionM(),
            "unknownKey": interactionM(),
            "unknownClick": interactionM(),
            "upKey": interactionM(),
            "leftKey": interactionM(),
            "prevClick": interactionM(),
            "downKey": interactionM(),
            "rightKey": interactionM(),
            "nextClick": interactionM(),
            "instructionClick": interactionM()
        },
        intent: {
            "unknown": intentM(),
            "prevStep": intentM(),
            "nextStep": intentM(),
            "setStep": intentM(),
            "start": intentM(),
            "done": intentM()
        },
        step: {},
        highlightIngredients: highlightIngredients,
        group: group,
        interface: interface,
        recipe: recipe,
        session: session,

        //use ObjectId for this.
        timestampInterval: [],
        timestampDuration: null,
        totalDuration: null,
        totalStepDuration: null,

        totalStepDelta: 0,
        totalStepDeltaRate: 0, // average change in steps per minute

        totalStepChange: 0,
        totalStepChangeRate: 0, //average number of times step changed per minute

        studyErrors: {
            groupChanged: 0,
            highlightChanged: 0,
            timeReset: 0,
            stepDurationMismatch: 0,
            stepChangeMismatch: 0
        } //counted as the number of times totalTime went to 0.
    };

    var lastTotalDuration = 0;
    var carryDuration = 0;
    var startTS = null;
    var lastTS = null;

    var runOnce = true;
    cursor.forEach(function(item){

        if(runOnce){
            //printjson(item);
            results.highlightIngredients = item.highlightIngredients;
            results.group = item.group;
            runOnce = false;
        }

        var ts = item._id.getTimestamp();
        if(startTS == null){
            results.timestampInterval[0] = ts;
            startTS = ts;
        }
        lastTS = ts;

        //highlight conditions changed
        if(results.highlightIngredients != item.highlightIngredients) {
            results.studyErrors.highlightChanged += 1;
            results.highlightIngredients = item.highlightIngredients;
        }

        //group changed
        if(results.group != item.group) {
            results.studyErrors.groupChanged += 1;
            results.group = item.group;
        }

        results.totalDuration = item.totalDuration;
        //something happened with browser / computer
        if(results.totalDuration < lastTotalDuration){
            results.studyErrors.timeReset += 1;
            carryDuration += lastTotalDuration;
        }
        lastTotalDuration = item.totalDuration;


        results.totalStepDelta += Math.abs(item.stepDelta);

        if(item.stepDelta != 0 || item.interaction == "doneClick"){
            results.totalStepDuration += item.stepDuration;
            results.totalStepChange += 1;
        }

        var stepNumStr = String(item.step);
        if(results.step[stepNumStr] == null){
            results.step[stepNumStr] = stepM();
        }
        var stepData = results.step[stepNumStr];
        var intentData = results.intent[item.intent];
        var interactionData = results.interaction[item.interaction];

        //interaction
        interactionData.count += 1;
        interactionData.totalDuration += item.interactionDelta;

        //intent
        intentData.count += 1;
        if(item.intentSuccess){
            intentData.success += 1;
        } else {
            intentData.fail += 1;
        }

        //step
        if(item.stepDelta != 0 || item.interaction == "doneClick" || item.interaction == "startClick"){
            stepData.totalDuration += item.stepDuration;
            stepData.numViews += 1;
        }

    });

    function toMinutes(value){
        return Math.round(value / 1000 / 60 * 100) / 100;
    }

    function toHours(value){
        return Math.round(value / 1000 / 60 / 60 * 100) / 100;
    }

    function precision(value, precision){
        return Math.round(value*Math.pow(10, precision))/Math.pow(10, precision);
    }

    // general aggregate
    results.timestampInterval[1] = lastTS;
    results.timestampDuration = {
        m: toMinutes(lastTS - startTS),
        h: toHours(lastTS - startTS)
    };

    results.totalDuration += carryDuration;
    results.totalDuration = {
        m: toMinutes(results.totalDuration),
        h: toHours(results.totalDuration)
    };

    results.totalStepDuration = {
        m: toMinutes(results.totalStepDuration),
        h: toHours(results.totalStepDuration)
    };

    var totalMinutes = results.totalStepDuration.m;

    results.totalStepDeltaRate = precision(results.totalStepDelta/totalMinutes, 2);
    results.totalStepChangeRate = precision(results.totalStepChange/totalMinutes, 2);

    var i;
    var rData;

    //interaction aggregate
    for(i in results.interaction){
        rData = results.interaction[i];
        rData.totalDuration = toMinutes(rData.totalDuration);
        rData.rate = precision(rData.count/totalMinutes, 2);
    }

    //intent aggregate
    for(i in results.intent){
        rData = results.intent[i];
        rData.rate = precision(rData.count/totalMinutes, 2);
        rData.successRate = precision(rData.success/totalMinutes, 2);
        rData.failureRate = precision(rData.fail/totalMinutes, 2);
    }

    //step aggregate
    results.studyErrors.stepDurationMismatch = results.totalStepDuration.m;
    results.studyErrors.stepChangeMismatch = results.totalStepChange;
    for(i in results.step) {
        rData = results.step[i];
        rData.totalDuration = toMinutes(rData.totalDuration);
        rData.averageDuration = rData.totalDuration/rData.numViews;
        results.studyErrors.stepDurationMismatch -= rData.totalDuration;
        results.studyErrors.stepChangeMismatch -= rData.numViews;
    }

    return results;
}

///*

var cl = [];

//group 1
var group1 = [];
cl[0] = aggregateSessionResults("a7eb5180f2e6e2f4d49d743114520acff26d4c7e", "eggs", "control");
cl[1] = aggregateSessionResults("a7eb5180f2e6e2f4d49d743114520acff26d4c7e", "lasagna", "sbs");
cl[2] = aggregateSessionResults("a7eb5180f2e6e2f4d49d743114520acff26d4c7e", "risotto", "responsive");

//group 2
var group2 = [];
cl[3] = aggregateSessionResults("b693ab00711bf625163aa9369858a5997f0cca58", "lasagna", "responsive");
cl[4] = aggregateSessionResults("b693ab00711bf625163aa9369858a5997f0cca58", "risotto", "control");
cl[5] = aggregateSessionResults("b693ab00711bf625163aa9369858a5997f0cca58", "eggs", "sbs");

//group 3
var group3 = [];
cl[6] = aggregateSessionResults("5511517ce047964b623ec6906885690eeacbda56", "risotto", "sbs");
cl[7] = aggregateSessionResults("5511517ce047964b623ec6906885690eeacbda56", "eggs", "responsive");
cl[8] = aggregateSessionResults("5511517ce047964b623ec6906885690eeacbda56", "lasagna", "control");

var collHandle = db["logs_computed"];
collHandle.remove();

for(var i=-1;++i<cl.length;){
    var item = cl[i];

    var query = {
        group: item.group,
        interface: item.interface,
        recipe: item.recipe,
        session: item.session
    };
    var result = collHandle.update(query, item, {upsert: true});
    printjson(result);
}

//*/