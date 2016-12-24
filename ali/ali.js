//On load function for the game
$(document).ready(function(){
  var city = "";
  var withWho = "";
  var when = "";

  var selectedDate = new Date(2016, 11, 25, 0, 0, 0, 0);
  var now = new Date();
  now.setHours(0,0,0,0);
  if (selectedDate < now) {
      Q1();
  }
  else {
    $("#question").text("It's not Christmas Yet!!!");
  }

  function Q1 ()
  {
    $("#step").text("Question 1:");
    $("#question").text("Which city would you rather spend a weekend in?:");
    $("#img1").attr("src", "sanfran.jpg");
    $("#img2").attr("src", "seattle.jpg");

    $("#img1").on("click", function(){
        if (!city)
        {
          city = "San Francisco";
        }
        Q2();
    });
    $("#img2").on("click", function(){
        if (!city)
        {
          city = "Seattle";
        }
        Q2();
    });
  }

  function Q2()
  {
    $("#step").text("Question 2:");
    $("#question").text("Who would you rather go with?:");
    $("#img1").attr("src", "des1.jpg");
    $("#img2").attr("src", "des2.jpg");

    $("#img1").on("click", function(){
        withWho = "Des";
        Q3();
    });
    $("#img2").on("click", function(){
        withWho = "Des";
        Q3();
    });
  }

  function Q3()
  {
    $("#step").text("Question 3:");
    $("#question").text("When would you rather go?:");
    $("#img1").attr("src", "spring.jpg");
    $("#img2").attr("src", "summer.jpg");
    $("#img1").on("click", function(){
        if (!when)
        {
          when = "Spring";
        }
        Unwrap();
    });
    $("#img2").on("click", function(){
        if (!when)
        {
          when = "Summer";
        }
        Unwrap();
    });
  }

  function Unwrap() {
    $("#img2").hide();
    $("#img1").attr("src", "gift_0.jpg");

    $("#step").text("Time to unwrap your gift!");
    $("#question").text("Click to unwrap!");

    $("#img1").on("click", function(){
      $("#img1").hide();
      displayGift();
    });
  }

  function displayGift()
  {
    $("#step").text("Merry Christmas!!!");
    $("#question").text("You will be going to " + city + " with " + withWho + " sometime in the " + when + " of 2017.");
  }

});
