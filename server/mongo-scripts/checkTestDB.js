var conn = new Mongo();
var db = conn.getDB("omnomnom-test");

var out = {logs: db.logs.count(), nasas: db.nasas.count(), surveys: db.surveys.count()};

printjson(out);