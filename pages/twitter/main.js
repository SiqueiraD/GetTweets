(function (app) {
    console.log('ahh');

    var myFunction = function (){
        console.log('oi');
    }

})()

$(document).ready(function() {
    //console.log("ready: " + Date.now());
    $('#formP').on('submit', function(e,i,a){
        console.log($('#inputHashtag')[0].value);
        
    });
});


window.onload = function() {
    console.log("onload: " + Date.now());
};