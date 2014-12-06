conn = new Mongo();
db = conn.getDB("omnomnom");

out = {logs: db.logs.count(), nasas: db.nasas.count(), surveys: db.surveys.count()};

printjson(out);