var express = require("express");
var bodyParser = require("body-parser");
var http = require('http');
var path = require('path');

var cors = require("./middleware/cors");
var router = require("./router");

var MongoService = require("./services/MongoService");
var BigOvenService = require("./services/BigOvenService");

var serviceInstance = null;
var app = null;

//init();
exports.init = init;
exports.openService = openService;

function init(dbName){
    if(dbName == null){
        dbName = "omnomnom-test";
    }
    openService(dbName);
}

function openService(dbName){
    serviceInstance = new MongoService(dbName);
    serviceInstance.open(serviceOpened.bind(this));
}

function serviceOpened(err, db){
    var ok = err==null;
    if(!ok){
        console.log("\nDatabase not ok\n");
        console.log(err);
        return;
    }
    console.log("Mongo Database:", db.databaseName);
    initServer.bind(this)();
}

function initServer(){
    router.mongoService = serviceInstance;
    router.bigOvenService = BigOvenService;
    app = express();
    app.set('port', 8000);
    app.use(express.static(path.join(__dirname, 'static')));
    app.use(bodyParser.json());
    app.use(cors.allowAnyCrossDomain);
    app.use(router.router);
    http.createServer(app).listen(app.get('port'), null, serverCreated);
}

function serverCreated(){
    console.log('Express server:', app.get('port'));
}