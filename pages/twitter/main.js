window.onload = function () {
  console.log("onload: " + Date.now());
  $('#formP').on('submit', function (e, i, a) {
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
  });
};

function exibeResultado(res) {
  var table = document.getElementById("myTable");
  if (table.tBodies[0].rows.length > 0)
    table.tBodies[0].innerHTML = "";
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
  console.log(res);
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
      });
    });
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