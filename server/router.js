var express = require("express");

exports.mongoService = null;
exports.bigOvenService = null;

exports.router = express.Router();

//?q=Recipe Name&mode=any
//currently returns only a single result.
exports.router.get('/search/', function(req, res) {
    var lookup = req.query.q;
    var mode = req.query.mode;
    //console.log(mode, lookup);
    if(mode == "title"){
        exports.bigOvenService.recipesTitle(lookup, function(err, result){
            if(err != null){
                return res.json({error: err, result: result});
            }
            if(result.ResultCount === 0){
                return res.json({error: "NO_RESULTS", result: result});
            }
            var id = result.Results[0].RecipeID;
            exports.bigOvenService.recipe(id, function(err, result){
                res.json({error: null, result: result});
            });
        });
    } else if(mode == "any"){
        exports.bigOvenService.recipesAny(lookup, function(err, result){
            if(err != null){
                return res.json({error: err, result: result});
            }
            if(result.ResultCount === 0){
                return res.json({error: "NO_RESULTS", result: result});
            }
            var id = result.Results[0].RecipeID;
            exports.bigOvenService.recipe(id, function(err, result){
                res.json({error: null, result: result});
            });
        });
    } else {
        console.log("Supported modes:", "title", "any");
    }
});

exports.router.get('/:collection/', function(req, res) {
    var collection = req.params.collection;
    var query = {};
    var projection = {};
    var options = {};
    options.sort = [['_id', 'descending']];
    options.limit = req.query.limit !== null? parseInt(req.query.limit) : 100;
    exports.mongoService.query(collection, query, projection, options, function(err, result){
        if(err != null){
            res.json({"message": "error", error: err.toString(), result: result});
        } else {
            res.json({"message": "ok", error: null, result: result});
        }
    });
}.bind(this));

exports.router.get('/:collection/:session', function(req, res) {
    var collection = req.params.collection;
    var session = req.params.session;

    var query = {session: session};
    var projection = {};
    var options = {};
    options.sort = [['_id', 'descending']];
    options.limit = req.query.limit !== null? parseInt(req.query.limit) : 100;
    exports.mongoService.query(collection, query, projection, options, function(err, result){
        if(err != null){
            res.json({"message": "error", error: err.toString(), result: result});
        } else {
            res.json({"message": "ok", error: null, result: result});
        }
    });
}.bind(this));

exports.router.post('/:collection/:session', function(req, res) {
    var collection = req.params.collection;
    var session = req.params.session;
    var doc = req.body;
    doc.session = session;
    console.log(doc);
    exports.mongoService.addDoc(collection, doc, function(err, result){
        console.log(err, result);
        if(err != null){
            res.json({"message": "error", error: err.toString(), result: result});
        } else {
            res.json({"message": "ok", error: null, result: result});
        }
    });
}.bind(this));