var conn = new Mongo();
var testDb = conn.getDB("omnomnom-test");
var realDb = conn.getDB("omnomnom");

var session = "fa44a60aacc888532a336fffd44409a4bfd7e937";

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