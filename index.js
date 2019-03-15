var express = require('express');
var Twitter = require('twitter');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app = express();

app.set('port', (process.env.PORT || 3000));

client = new Twitter({
  consumer_key: 'di5OGJMlDXdlIeZrtwS89cx2O',
  consumer_secret: 'ux6OLwwu84cyggLXhrFvbklPxj4kR4MvEZmsbAzNbQPiiT2V7f',
  access_token_key: '',
  access_token_secret: ''
});

app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// SCRIPTS
app.get('/scripts/jquery.js', function (req, res) {
  var jquery = require.resolve('jquery');
  res.sendFile(jquery);
});
app.get('/scripts/bootstrap.js', function (req, res) {
  var bootstrap = require.resolve('bootstrap');
  res.sendFile(bootstrap);
});
app.get('/scripts/popper.js', function (req, res) {
  var popper = require.resolve('popper');
  res.sendFile(popper);
});

// Rotas 
app.get('/', function (req, res) {
  res.send('Hello World!');
  var params = {
    screen_name: 'nodejs'
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });
});

app.use(express.static(__dirname + '/pages'));
app.use(express.static(__dirname));

app.get('/twitter', function (req, res) {
  var options = {
    root: __dirname + '/pages/twitter/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  res.sendFile("twitter.html", options);
});

app.use('/tshoweett', express.static(__dirname + '/pages/screen/'));
app.get('/tshoweett', function (req, res) {
  var options = {
    root: __dirname + '/pages/screen/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  res.sendFile("screen-show.html", options);
});

var idTweet;
app.get('/set/tweet', function (req, res) {
  var params = req.url.split('=')[1];
  if (params) {
    idTweet = params;
    res.send(params);
  }
});

app.get('/get/tweet', function (req, res) {
  if (idTweet)
    res.send(idTweet);
  else
    res.send('Não tem numero')
});

app.get('/tt', function (req, res) {
  var params = req.url.split('=')[1];
  params = params[0] == '#' ? params : '#' + params;
  client.get('search/tweets', {
    q: params,
    tweet_mode: 'extended',
    count: 100,
    include_entities: 1
  }, function (error, tweets, response) {
    if (!error) {
      if (response)
        res.json(JSON.parse(response.toJSON().body));
    } else {
      console.log(error);
    }
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});