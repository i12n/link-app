var router = require('koa-router')();
var request = require('request-promise');

function getJson(query) {
    var options = {
        uri: 'http://127.0.0.1:5000/title',
        qs: {
            url: query['link']
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true,
        simple: false
    };

    return request(options, function(err) {})
        .then(function (data) {
            return data;
        }, function() {
        })
        .catch(function (err) {
            // API call failed...
        });
}

router.post('/', function *(next) {
    var data = yield getJson(this.request.body);
    this.body = JSON.stringify({'data': data});
});

module.exports = router;
