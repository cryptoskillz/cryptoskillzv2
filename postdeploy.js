

var AWS = require("aws-sdk");
AWS.config.loadFromPath('./postdeploy.json');
var randomstring = require('randomstring');
//debug
var version = process.argv[2];
//set the distid
if (version == "prod") {
    distid = "<PRODID>";
}
if (version == "stage") {
    //todo (chris) change this to stage
    distid = "<STAGEID>";
}
//if we have a distid then invildate the cloudflare files
if (distid != "") {
    var cloudfront = new AWS.CloudFront();
    var reference = randomstring.generate(16);
    var cloudfront = new AWS.CloudFront();
    var params = {
        DistributionId: distid,
        /* required */
        InvalidationBatch: { /* required */
            CallerReference: reference,
            /* required */
            Paths: { /* required */
                Quantity: 1,
                /* required */
                //Items: ['/HTML/assets/*','/HTML/assets/images/*','/HTML/assets/js/*','/HTML/assets/css/*'
                    Items: ['/*'
                    /* more items */
                ]
            }
        }
    };
    cloudfront.createInvalidation(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    });
    if (version == "prod") {

        var distid = "";
        var request = require('request');
        var headers = {
            'X-Auth-Email': 'charlie@clasiq.com',
            'X-Auth-Key': '5eda84b57ba9476312d9d574a1ba32db679eb',
            'Content-Type': 'application/json'
        };
        var dataString = '{"purge_everything":true}';
        var options = {
            url: 'https://api.cloudflare.com/client/v4/zones/<zone>/purge_cache',
            method: 'POST',
            headers: headers,
            body: dataString
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
        request(options, callback);

        
    }
} else {
    console.log('no invildation ');
}