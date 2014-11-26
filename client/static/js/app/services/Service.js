define([
    "core/EventBus"
    ], function(EventBus) {

    var Service = function(){

    };

    Service.prototype.init = function(){

    };

    Service.prototype.search = function(query, mode, callback){
        console.log("getting data", query, mode);
        var url = "http://"+document.domain+":8000/search/";
        var headers = {};
        var data = {mode: mode==null? "any":mode, q: query};
        $.ajax({
            type: "GET",
            url: url,
            contentType: 'application/json',
            dataType: "json",
            headers: headers,
            data: data,
            success: function(data){
                callback(data.error, data);
            }
        });
    };

    Service.prototype.getData = function(collection, id, callback){
        console.log("getting data", collection, id);
        var url = "http://"+document.domain+":8000/"+collection+"/"+id;
        var headers = {};
        var data = {};
        $.ajax({
            type: "GET",
            url: url,
            contentType: 'application/json',
            dataType: "json",
            headers: headers,
            data: data,
            success: function(data){
                callback(data.error, data);
            }
        });
    };

    Service.prototype.putData = function(collection, id, data){
        console.log("putting data", id, data);
        var url = "http://"+document.domain+":8000/"+collection+"/"+id;

        $.ajax({
            type: "POST",
            url: url,
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(data){
                console.log(data);
            }
        });
    };

    return Service;

});
