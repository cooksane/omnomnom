var conn = new Mongo();
var db = conn.getDB("omnomnom-test");

db.logs.remove();
db.nasas.remove();
db.surveys.remove();