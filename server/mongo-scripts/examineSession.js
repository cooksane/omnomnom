var conn = new Mongo();
var testDb = conn.getDB("omnomnom-test");
var realDb = conn.getDB("omnomnom");

var session = "b693ab00711bf625163aa9369858a5997f0cca58";

function copyToActual(collection){
    var src = testDb[collection];
    var dst = realDb[collection];
    var cursor = src.find({session: session});
    cursor.forEach(function(item){
	delete item._id;
	//dst.insert(item);
	//printjson(item);
    });
}

copyToActual('logs');
copyToActual('nasas');
copyToActual('surveys');