//var _ = require("underscore");
var BigOvenService = require("./mongoService/BigOvenService");
var Promise = require('bluebird');

var lookup = process.argv.length > 2? process.argv[2] : "Ravioli Basil";
var mode = process.argv.length > 3? process.argv[3] : "title";

if(mode == "title"){
    BigOvenService.recipesTitle(lookup, function(err, result){
        var id = result.Results[0].RecipeID;
        BigOvenService.recipe(id, function(err, result){
            console.log(JSON.stringify(result, null, "    "));
        });
    });
} else if(mode == "any"){
    BigOvenService.recipesAny(lookup, function(err, result){
        var id = result.Results[0].RecipeID;
        BigOvenService.recipe(id, function(err, result){
            console.log(JSON.stringify(result, null, "    "));
        });
    });
} else {
    console.log("Supported modes:", "title", "any");
}

//var url = endpoint + path + "/" + recipeId + "?api_key=" + apiKey;
//var endpoint = "http://api.bigoven.com/recipes?";

/*
 BigOvenService.recipesTitle(lookup, function(err, result){
 var id = result.Results[0].RecipeID;
 BigOvenService.recipe(id, function(err, result){
 var log = function(x){console.log(x)};
 var instructions = result.Instructions.split("\r\n");
 log("\nKEYS: ");
 Object.keys(result).forEach(log);
 log("\nINSTRUCTIONS: ");
 instructions.forEach(log);
 log("\nINGREDIENTS: ");
 result.Ingredients.forEach(log)
 });
 });
 */


/*
 Q.fcall(something).then(function(err,result){

 }).then(function(err,result){

 });
 */