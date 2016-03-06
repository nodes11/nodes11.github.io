//Keep track of on/off for each button
var on = 0;

document.addEventListener("DOMContentLoaded", function (event) {
  var overlay = document.getElementById("popup");
  var background = document.getElementById("dim");
  var main = document.getElementById("main");


  $(".it-outer").click(function (e) {
    e.stopPropagation();
    $(".popup").html($(this).children('.section').html());
    if (on == 0){
      background.style.display = "block";
      overlay.style.display = "block";
      main.style.overflow = "hidden";
      on = 1;
    }
    else {
      background.style.display = "none";
      overlay.style.display = "none";
      main.style.overflow = "scroll";
      on = 0;
    }
  });

  $("#dim").click(function (e) {
    on = 0;
    $("#dim").css("display", "none");
    $("#popup").css("display", "none");
    $("#main").css("overflow", "scroll");
  });

});
//'<h2 id="close" class="close">X</h2>'
