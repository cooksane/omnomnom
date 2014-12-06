var conn = new Mongo();
var db = conn.getDB("omnomnom");

var mapFunction = function() {
    
    var value = {};
    var interfaceData = value[this.interface] = {};
    var data = interfaceData[this.tabSwitch?"switch":"noSwitch"] = {};
    
    data.misses = this.misClick + this.wrongCommand;
    data.totalClicks = this.clicks;
    data.totalTime = this.time;
    data.totalTrials = 1;
    
    emit(this.session, value);
};

var reduceFunction = function(key, values) {
    var result = {};
    for(var i=-1;++i<values.length;){
        var value = values[i];
        for(var interface in value){
            var interfaceData = value[interface];
            if(result[interface] == null) result[interface] = {};
            for(var tabSwitch in interfaceData){
                var srcData = interfaceData[tabSwitch];
                if(result[interface][tabSwitch] == null) result[interface][tabSwitch] = {};
                var dstData = result[interface][tabSwitch];
                for(var k in srcData){
                    if(dstData[k] == null) dstData[k] = srcData[k];
                    else dstData[k] += srcData[k];
                }
            }
        }
    }
    return result;
};

var finalizeFunction = function(key, value) {
    for(var interface in value){
        var interfaceData = value[interface];
        for(var tabSwitch in interfaceData){
            var data = interfaceData[tabSwitch];
            data.average = data.totalTime/data.totalTrials;
            data.error = data.misses/data.totalClicks;
        }
    }
    return value;
};

var sessions = db.surveys.find({},{session:1}).map(function(x){return x.session});

var result = db.runCommand(
    {
        mapReduce: 'logs',
        map: mapFunction,
        reduce: reduceFunction,
        finalize: finalizeFunction,
        out: { replace: 'logs_computed', db: 'cs279_hw2_online' },
        query: {session: {$in: sessions}},
        verbose: true,
        jsMode: true
    }
);

printjson(result);