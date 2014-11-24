
// router middleware
var allowAnyCrossDomain = function(req, res, next) {
    var origin = req.get('origin');
    if(origin != null) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Methods', 'GET');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    } else {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    }
    next();
};

var allowAnyLocalhostGet = function(req, res, next) {
    var origin = req.get('origin');
    //very restrictive and obviously correct
    //allow either "http://localhost:*" or "http://*.localhost:*"
    //where port * is any number, and sub-domain * is any valid sub-domain.
    if(origin != null){
        var allowRegex = /^http:\/\/localhost:?[0-9]*$|^http:\/\/[a-zA-Z0-9\-]+\.localhost:?[0-9]*$/;
        var originAllowed = origin.match(allowRegex);
        console.log(originAllowed);
        if(originAllowed != null){
            res.header('Access-Control-Allow-Origin', origin);
            res.header('Access-Control-Allow-Methods', 'GET');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
        }
    }
    next();
};

module.exports = {
    allowAnyCrossDomain: allowAnyCrossDomain,
    allowAnyLocalhostGet: allowAnyLocalhostGet
};