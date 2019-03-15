window.onload = function () {
  setTwttrFunc();
  refreshTweet();
};

function setTwttrFunc(){
  try {
    window.twttr = (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "http://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = function (f) {
        t._e.push(f);
      };

      return t;
    }(document, "script", "twitter-wjs"));
  } catch (error) {
    console.log('erro no widget do twitter');
    try {
      window.twttr = (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
          t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
  
        t._e = [];
        t.ready = function (f) {
          t._e.push(f);
        };
  
        return t;
      }(document, "script", "twitter-wjs"));
    } catch (error) {
      throw "Erro no widgets do twitter";
    }
  }
}

var timer;
var _id;
var seconds = 10; // how often should we refresh the DIV?

function refreshTweet() {
  getIdTweet();
  timer = setInterval(function () {
    getIdTweet();
  }, seconds * 1000);
};

function cancelRefreshTweet() {
  clearInterval(timer);
};

function getIdTweet() {
  console.log(Date.now());
  $.ajax({
    url: "/get/tweet",
    type: "get",
    success: function (response) {
      if (response)
        if (parseInt(response))
          getTweet(response);
      console.log(response);
    },
    error: function (xhr) {
      //Do Something to handle error
    }
  });
}

function getTweet(id) {
  if (_id != id) {
    transicaoTimer(transicaoEsconderMostrar);
    _id = id;
    document.getElementById('first-tweet').innerHTML = "";
    setTimeout(showTweet, 500);
  }
};

function showTweet() {
  window.twttr.widgets.createTweet(_id, document.getElementById('first-tweet'), {
      align: 'center'
    })
    .then(function (el) {
      transicaoTimer(transicaoMostrar);
    })
}

function transicaoTimer(func) {
  setTimeout(func, 0);
}

function transicaoEsconderMostrar() {
  var num = Math.floor(Math.random() * 3) + 1;
  num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
  move('#first-tweet')
    .set('opacity', '0.1')
    .scale(num)
    .duration('2s')
    .end(transicaoMostrar);
}

function transicaoMostrar() {
  move('#first-tweet')
    .set('opacity', '1')
    .duration('1.5s')
    .scale(1)
    .end();
};