var $current;
var currentP;

//Just add tabnames and everything else will be done for you!
var tabNames = ["Aperture", "Shutter Speed", "ISO", "More"];
var htmltext = ["", "", "", ""];

htmltext[0] += "<p>Aperture is the hole that controls the amount of light that passes through to reach the camera. Depending on how much light you have available, you’ll want to adjust your aperture accordingly. Use a larger aperture in darker settings with less available light. Use a smaller aperture in brighter settings with more available light.</p>";
htmltext[0] += "<p>Aperture can also be used to create variation in the depth of field of the photo. A larger aperture value corresponds to a smaller opening. While a smaller aperture value corresponds to a larger opening. </p>";
htmltext[0] += "<br>";
htmltext[0] += "<img src='images/aperture_sizes.jpeg'></img>"
htmltext[0] += "<p>With a larger aperture value, your photo will have a greater depth of field. With a smaller aperture value, your photo will have a more shallow depth of field. See if you can notice the change in the depth of field as the aperture changes in the photos below.</p>";
htmltext[0] += "<br>";
htmltext[0] += "<img src='images/aperture_one.jpg'></img><p>F1.8 - Notice as you look deeper into the photo, objects become more soft becuase of the shallow depth of field.</p>";
htmltext[0] += "<br>";
htmltext[0] += "<img src='images/aperture_two.jpg'></img><p>F13 - Notice as you look deeper into the photo, objects become more soft becuase of the shallow depth of field.</p>";
htmltext[0] += "<br>";
htmltext[0] += "<img src='images/aperture_three.jpg'></img><p>F22 - Notice as you look deeper into the photo, objects become more soft becuase of the shallow depth of field.</p>";
htmltext[0] += "<br>"
htmltext[0] += "<p>Think about how you would adjust your aperture given these situations:</p>";
htmltext[0] += "<ol><li>A portrait of your friend on a sunny day</li><li>In a dark alley way with very little incoming light</li><li>In a football stadium at night</li><li>Your dog is in midair trying to catch a frisbee</li><li>You want to capture the movement of the stars</li></ol>";

htmltext[1] += "<p>Shutter speed is the amount of time light is allowed into the camera. Depending on how much available light you have, you'll want to adjust your shutter speed accordingly. Use a slower shutter speed in darker settings to allow more light into the camera. User a faster shutter speed in brighter settings to allow less light into the camera.</p>";
htmltext[1] += "<p>Remember that if you shoot at too slow of shutter speed you may encounter blur, or your photo may be too bright. Too faster of a shutter speed and your photo may be too dark.</p>";
htmltext[1] += "<p>Below are 3 different photos of the same person running, each photo is shot at a progressively faster shutter speed. See if you can notice the effects of shutter speed on the photo.</p>";
htmltext[1] += "<br>";
htmltext[1] += "<img src='images/run_slow.jpg'></img><p>1/15 of a second shutter speed. Notice that the subject is in focus but the background is blurred out due to the slow shutter speed.</p>";
htmltext[1] += "<br>";
htmltext[1] += "<img src='images/run_medium.jpg'></img><p>1/125 of a second shutter speed. In this example there is less blur in both the subject and the background due to the faster shutter speed.</p>";
htmltext[1] += "<br>";
htmltext[1] += "<img src='images/run_fast.jpg'></img><p>1/800 of a second shutter speed. Both the subject and background appear to be sharp and in focus to due to the even faster shutter speed.</p>";
htmltext[1] += "<br>";
htmltext[1] += "<p>Think about how you would adjust your shutter speed given these situations:</p>";
htmltext[1] += "<ol><li>Outside on a sunny day</li><li>In a dark alley way with very little incoming light</li><li>In a football stadium at night</li><li>Your dog is in midair trying to catch a frisbee</li><li>You want to capture the movement of the stars</li></ol>";

htmltext[2] += "<p>ISO is the measure of how sensitive your camera is to the available light. Think of ISO as servants who collect light for you.  The higher the ISO, the more servants you have to collect light and make your image brighter.  Using too many servants, however, will make them appear in your photograph as grain or noise. Depending on your setting adjust your ISO accordingly. In a setting with more available light use a lower ISO value. In a setting with less available light use a higher ISO value.</p>";
htmltext[2] += "<p>The photos below were taken in a in a library with little available light. The aperture in all of these photos stays constant. See if you can notice the relationship between the value of the ISO and shutter speed as well as the amount of grain in each photo.</p>";
htmltext[2] += "<br>";
htmltext[2] += "<img src='images/iso_320.jpg'></img><p>ISO 320, 1/200 of a second - This photo should have the least amount of grain since it was shot at the lowest ISO.</p>";
htmltext[2] += "<br>";
htmltext[2] += "<img src='images/iso_6400.jpg'></img><p>ISO 6400, 1/1250 of a second - Can you see the increased grain in the photo with the increase value of the ISO?</p>";
htmltext[2] += "<br>";
htmltext[2] += "<img src='images/iso_24600.jpg'></img><p>ISO 25600, 1/4000 of a second - Can you see the relationship between the value of the ISO and the shutter speed?</p>";
htmltext[2] += "<br>";
htmltext[2] += "<p>Think about the ISO you would use given these situations:</p>";
htmltext[2] += "<ol><li>Outside on a sunny day</li><li>In a dark alley way with very little incoming light</li><li>In a football stadium at night</li><li>Your dog is in midair trying to catch a frisbee</li><li>You want to capture the movement of the stars</li></ol>";

htmltext[3] += "<p>Creating the most visually appealing photos is a balancing act of Shutter Speed, Aperture, and ISO. Below are two examples on how to do so.</p>";
htmltext[3] += "<br>";
htmltext[3] += "<img src='images/football.jpg'></img><p></p><p>This photo was taken during the 2015 Apple Cup. At the time of this photo the sun was behind the stadium, decreasing the amount of available light. Using a slower shutter speed was not an option because we wanted to capture the motion of the players. So in order to correct for this, a high ISO was used to increase the camera sensitivity to the available light. Thus permitting a faster shutter speed. Finally a large aperture was used to create a shallow depth of field in between the player and the background and to allow more light into the sensor. </p>";
htmltext[3] += "<img src='images/lights.jpg'></img><p>Lights - ISO 100, 29mm, F22, 30.0 Seconds</p><p>In this photo we are trying to capture the movement of the car light. Using a low ISO allows us to use a longer shutter speed and keeps the photo from looking grainy. In order to achieve the trail of the light, the shutter speed should be at least 5 seconds to capture the movement of the car through the entire frame. Finally, using a large aperture will allow the camera to take in the maximum amount of available light.</p>";



var pages = tabNames.length;
var tabHeight = 98.5/(2.4*pages);

document.addEventListener("DOMContentLoaded", function (event) {
  /*Dynmaically Create tabs and pages*/
  function create(){
    for (var i = 0; i < pages; i++){
      var $newtab = $('<div id="tab-' + toWords(i+1) + '" class="tab">' + tabNames[i] + '<div id="right-tab">--</div>' + '</div>');
      $newtab.css("height", tabHeight+"%");
      //$newtab.css("zIndex", pages-(i-1));
      $( "div#tabs" ).append( $newtab);

      var $newsection = $('<div id="section-' + toWords(i+1) + '" class="page page-' + toWords(i+1) + ' section-' + toWords(i+1) + ' ' + toWords(i+1) + '">' + htmltext[i] + '</div>');
      if (i == 0){
        $newsection.css("display", "none");
      }else{
        $newsection.css("display", "none");
      }
      $( "div#sections" ).append( $newsection);
    }
  }

  create();

  $(document).on("click", function (event) {

    if (event.target.id.indexOf("tab-") >= 0 ){

      //Set page
      var tempEle2 = "section-" + event.target.id.substring(4, event.target.id.length-1) + " ";
      var te = event.target.parentElement.nextSibling.nextSibling;

      for (var i = 0; i < te.childNodes.length + 1; i++){
        if (te.childNodes[i].id == tempEle2){

          if (i == 1){
            $(".a").toggleClass("clicked");
            $("#title").text("Aperture");
          }
          else if (i == 2){
            $(".ss").toggleClass("clicked");
            $("#title").text("Shutter Speed");
          }
          else if (i == 3){
            $(".i").toggleClass("clicked");
            $("#title").text("ISO");
          }
          else if (i == 4){
            $(".m").toggleClass("clicked");
            $("#title").text("Putting it All Together");
          }

          if (currentP){
            currentP.style.display = "none";
          }
          currentP = te.childNodes[i];
          currentP.style.display = "block";
          break;
        }
      }

      //Set tab
      if ($current){
        $current.style.backgroundColor = "#000000";
        $current.style.color = "#FFFFFF";

          if ($current.childNodes[1].id == "right-tab"){
            $current.childNodes[1].style.backgroundColor = "#282c35";
            $current.childNodes[1].style.color = "#FFFFFF";
          }
      }
      $current = event.target;
      $current.style.backgroundColor = "#f3d239";
      $current.style.color = "#000000";

      if ($current.childNodes[1].id == "right-tab"){
        $current.childNodes[1].style.backgroundColor = "#e0ca1e";
        $current.childNodes[1].style.color = "#000000";
      }
    }
  });

  $(".back").on("click", function(event){
    $("#title").text("Photo Guide");
    if ($(".a").hasClass("clicked")){
      $(".a").removeClass("clicked");
    }
    if ($(".ss").hasClass("clicked")){
      $(".ss").removeClass("clicked");
    }
    if ($(".i").hasClass("clicked")){
      $(".i").removeClass("clicked");
    }
    if ($(".m").hasClass("clicked")){
      $(".m").removeClass("clicked");
    }

    if (currentP){
      currentP.style.display = "none";
    }

    if ($current){
      $current.style.backgroundColor = "#000000";
      $current.style.color = "#FFFFFF";

        if ($current.childNodes[1].id == "right-tab"){
          $current.childNodes[1].style.backgroundColor = "#282c35";
          $current.childNodes[1].style.color = "#FFFFFF";
        }
    }
  })
});
