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
              author: e.user.screen_name
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
      console.log('clicou:');
      console.log(element);
    };
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // Add some text to the new cells:
    cell1.innerHTML = element.text;
    cell2.innerHTML = element.author;

  });

  console.log(res);
};

function setTwitter() {
  $.ajax({
    url: "/sett",
    type: "get", //send it through get method
    data: {
      hashtag: $('#inputHashtag')[0].value
    },
    success: function (response) {
      if (response && response.statuses)
        exibeResultado(response.statuses.map(function (e) {
          return {
            text: e.full_text,
            author: e.user.screen_name
          };
        }))
      console.log(response);
      //Do Something  
    },
    error: function (xhr) {
      //Do Something to handle error
    }
  });
}