var router = require('koa-router')();
var request = require('request-promise');


function getJson(query) {
    var data = null;
    query['limit'] = 10;
    var options = {
        uri: 'http://127.0.0.1:5000/links',
        qs: query,
        headers: {
        'User-Agent': 'Request-Promise'
        },
        json: true
    };
 
    return request(options)
    .then(function (repos) {
        data = repos;
        return data;
    })
    .catch(function (err) {
        // API call failed... 
    });
}

function postJson(param) {
    var data ={};
    var options = {
    method: 'POST',
    uri: 'http://127.0.0.1:5000/links',
    form: param,
    headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
};
 
    return request(options)
    .then(function (parsedBody) {
        data = parsedBody;
        return data;
        // POST succeeded... 
    })
    .catch(function (err) {
        // POST failed... 
    });
}

router.get('/', function *(next) {
  var res_data = yield getJson(this.query);
  var before = res_data['before'];
  var after = res_data['after'];
  var data = res_data['data'];


  yield this.render('index', {
    title: 'Hello World Koa!',
    data:data,
    before:before,
    after:after
  });
}).post('/', function *(next) {
  var param = {'title': this.request.body['title'], 'url': this.request.body['link'], 'description': this.request.body['description']};
  var data = yield postJson(param);
  this.body = JSON.stringify(data);
});

module.exports = router;
