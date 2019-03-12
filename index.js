var express = require('express');
var Twitter = require('twitter');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

var app = express();

var client = new Twitter({
  consumer_key: 'di5OGJMlDXdlIeZrtwS89cx2O',
  consumer_secret: 'ux6OLwwu84cyggLXhrFvbklPxj4kR4MvEZmsbAzNbQPiiT2V7f',
  access_token_key: '',
  access_token_secret: ''
});



// Rotas 
app.get('/', function (req, res) {
  res.send('Hello World!');
  var params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });
});

app.get('/tt', function (req, res) {
  var params = {screen_name: 'nodejs'};
  client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
      res.send('twitter!');
    }
    else
    console.log(error);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

