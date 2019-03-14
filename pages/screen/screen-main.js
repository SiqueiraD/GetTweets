window.onload = function () {
  refreshTweet();

};

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
    ocultar();
    _id = id;
    document.getElementById('first-tweet').innerHTML = "";
    window.twttr.widgets.createTweet(id, document.getElementById('first-tweet'), {
        align: 'left'
      })
      .then(function (el) {
        mostrar();
      });
  }
};

function ocultar() {
  var element = document.getElementById("first-tweet");
  element.classList.add("hide");
}

function mostrar() {
  var element = document.getElementById("first-tweet");
  element.classList.remove("hide");
}