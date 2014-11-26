requirejs.config({
    baseUrl: "js/app",
    paths: {
        lib: '../../lib'
        , "cryptojs.core": '../../lib/cryptojslib/core'
        , "cryptojs.sha1": '../../lib/cryptojslib/sha1'
    }
    , shim: {
        'cryptojs.core': {
            exports: "CryptoJS"
        }
        , 'cryptojs.sha1': {
            deps: ['cryptojs.core'],
            exports: "CryptoJS.SHA1"
        }
        //, 'typeahead': ['jquery']
    }
});

requirejs([ 'Main' ], function(Main) {
    var main = new Main();
    main.init();
});