var querystring = require("querystring");
var http = require("http");
var _ = require("underscore");
var winston = require("winston");
var request = require('request');

//var category = "dessert,appetizer,bread,breakfast,drinks,main%20dish,salad,side%20dish,soup,marinade,other".split(",");

module.exports = BigOvenService;

function BigOvenService() {}
var Service = BigOvenService;

Service.baseUrl = "http://api.bigoven.com";
Service.apiKey = "dvxmS70dN2OLWd67ao8559Yi3ko16wk4";

Service.recipesTitle = function (title, callback){
    var query = { "title_kw": title };
    Service.makeRequest(query, "/recipes", callback);
};

Service.recipesAny = function (any, callback){
    var query = { "any_kw": any };
    Service.makeRequest(query, "/recipes", callback);
};

Service.recipe = function (id, callback){
    var query = {};
    Service.makeRequest(query, "/recipe/" + id, callback);
};

Service.makeRequest = function(query, path, callback){
    var url = Service.baseUrl + path;
    query.pg = 1;
    query.rpp = 25;
    query.sort = "quality";
    query.api_key = Service.apiKey;
    request.get({
        headers: {
            'Accept': 'application/json'
        },
        url: url,
        qs: query
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(error, JSON.parse(body));
        } else {
            callback(error, null);
        }
    });
};
