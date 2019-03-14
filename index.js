var express = require('express');
var jquery = require.resolve('jquery');
var Twitter = require('twitter');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app = express();

client = new Twitter({
  consumer_key: 'di5OGJMlDXdlIeZrtwS89cx2O',
  consumer_secret: 'ux6OLwwu84cyggLXhrFvbklPxj4kR4MvEZmsbAzNbQPiiT2V7f',
  access_token_key: '',
  access_token_secret: ''
});

app.use('/scripts', express.static(__dirname + '/node_modules/'));

// SCRIPTS
app.get('/scripts/jquery.js', function (req, res) {
  res.sendFile(jquery);
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

app.get('/sett', function (req, res) {
  var stream = client.stream('statuses/filter', {
    track: 'javascript'
  });
  stream.on('data', function (event) {
    console.log(event && event.text);
  });

  stream.on('error', function (error) {
    throw error;
  });

});

app.get('/sett2', function (req, res) {
  var params = req.url.split('=')[1];
  params = params[0] == '#' ? params.replace('#', '') : params;
  client.stream('statuses/filter', {
    track: params
  }, function (stream) {
    stream.on('data', function (event, t, a) {
      console.log(event && event.text);
    });

    stream.on('error', function (error) {
      throw error;
    });
  });

});

app.get('/tt', function (req, res) {
  var params = req.url.split('=')[1];
  params = params[0] == '#' ? params.replace('#', '') : params;
  client.get('search/tweets', {
    q: params,
    tweet_mode: 'extended_tweet',
    count: 100,
    include_entities: true
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