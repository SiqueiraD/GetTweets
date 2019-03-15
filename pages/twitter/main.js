window.onload = function () {
  console.log("onload: " + Date.now());
  $('#formP').on('submit', function (e, i, a) {
    move();
    searchTweets();
  });
  table_show_hide();
};

function table_show_hide() {
  var t = document.getElementsByTagName('tbody')[0];
  if (t)
    t.parentElement.parentElement.parentElement.hidden = t.innerHTML.trim().length == 0;
}


function searchTweets() {
  $.ajax({
    url: "/tt",
    type: "get", //send it through get method
    data: {
      hashtag: $('#inputHashtag')[0].value
    },
    success: function (response) {
      if (response && response.statuses)
        exibeResultado(response.statuses.map(function (e) {
          return {
            text: e.full_text,
            author: e.user.screen_name,
            id: e.id,
            id_str: e.id_str
          };
        }));
      console.log(response);
      //Do Something  
    },
    error: function (xhr) {
      //Do Something to handle error
    }
  });
}

function exibeResultado(res) {
  var table = document.getElementById("myTable");
  if (table.tBodies[0].rows.length > 0)
    table.tBodies[0].innerHTML = "";
  if (res.length > 0)
    res.forEach(element => {
      var row = table.tBodies[0].insertRow(table.tBodies[0].rows.length);
      row.onclick = function (e) {
        console.log('clicou:' + element.id);
        getTweet(element.id_str);
      };

      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);

      cell1.innerHTML = element.text;
      cell2.innerHTML = element.author;
    });
  else {
    var row = table.tBodies[0].insertRow(table.tBodies[0].rows.length);
    var cell1 = row.insertCell(0);
    cell1.colSpan = 2;
    cell1.innerHTML = 'Não foi encontrado resultado';
  }
  table_show_hide();
};

function getTweet(id) {
  document.getElementById('first-tweet').innerHTML = "";
  window.twttr.widgets.createTweet(id, document.getElementById('first-tweet'), {
      align: 'left'
    })
    .then(function (el) {
      console.log("Tweet displayed.");
      $('#myModal').modal('toggle');
      $('#submitTweet').on('click', function (el) {
        setTweet(id);
        Swal.fire({
          title: 'Tweet enviado',
          type: 'success',
          text: 'Em instantes o tweet será exibido na tela de exibição: \n' + urlShow(),
        });
        $('#myModal').modal('hide');
      });
    });
}

function urlShow(){
  var a = document.createElement('a');
  a.href = window.location.origin + "/tshoweett";
  a.text = "Clique aqui.";
  return a;
}

function setTweet(id) {
  $.ajax({
    url: "/set/tweet",
    type: "get", //send it through get method
    data: {
      ideet: id
    },
    success: function (response) {
      if (response)
        console.log(response);
    },
    error: function (xhr) {
      //Do Something to handle error
    }
  });
}

var interval;

function move() {
  var elem = document.getElementById("myBar");
  var width = 0;
  var desc = false;
  if (!interval)
    interval = setInterval(frame, 100);
  else {
    clearInterval(interval);
    interval = setInterval(frame, 100);
  }

  function frame() {
    if (width > 101 || width < 0)
      callSearch_toogleProgress();
    if (desc) {
      width--;
    } else {
      width++;
    }
    elem.style.width = width + '%';
  };

  function callSearch_toogleProgress() {
    desc = !desc;
    searchTweets();
  };
}