var Kraken = require("kraken");

var kraken = new Kraken({
    "api_key": "your-api-key",
    "api_secret": "your-api-secret"
});

var params = {
    url: "http://awesome-website.com/images/header.png",
    wait: true,
    resize: {
        width: 100,
        height: 75,
        strategy: "crop"
    }
};

kraken.url(params, function(status) {
    if (status.success) {
        console.log("Success. Optimized image URL: %s", status.kraked_url);
    } else {
        console.log("Fail. Error message: %s", status.message);
    }
});
