document.addEventListener("DOMContentLoaded", function(event){
  var date = new Date();
  var parts = date.toString().split(' ');
  date = parts[0] + " " + parts[1] + " " + parts[2] + ", " + parts[3];
  $(".time").html(date);

  $(".menu").on("click", function(event){
    if ($(".dropdown")[0].style.display == "none"){
      $(".dropdown")[0].style.display = "block";
    }
    else{
      $(".dropdown")[0].style.display = "none";
    }
  });
});
