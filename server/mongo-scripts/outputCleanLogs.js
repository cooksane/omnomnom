var conn = new Mongo();
var db = conn.getDB("omnomnom");

var collection = "logs_computed";
var collHandle = db[collection];

var query = {};
var project = {};

var cursor = collHandle.find(query, project).sort({_id: 1});

function outputDurations(cursor){
    cursor.forEach(function(item){
        printjson([
            item.group,
            item.interface,
            item.recipe,
            item.totalDuration.m+"m",
            item.totalStepDuration.m+"m",
            item.totalStepChange
        ]);
    });
}

outputDurations(cursor);