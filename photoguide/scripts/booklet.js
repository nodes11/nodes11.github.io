var $current;
var currentP;

//Just add tabnames and everything else will be done for you!
var tabNames = ["Aperture", "Shutter Speed", "ISO", "More"];
var htmltext = [
  "<h1>Aperture</h1><p>Aperture is the size of the hole in the lens that light passes through to reach the sensor. Typically measured in F stops, or the focal ratio, as the a F stop grows in value the size of the hole gets smaller, letting in less light. As the F stop decreases, the size of the hole gets bigger, letting in more light.</p><img src='images/aperture_sizes.jpeg'></img><p>Above, you can see the relationship in between the aperture value and the size of the hole in the lens.</p><p></p>",
  "<p>Shutter speed is the amount of time that light let into the sensor. Depending on how much surrounding light you have, you'll want to adjust your shutter speed accordingly. If you shoot at too slow of shutter speed you may encounter blur in your photo. Shoot at too faster of a shutter speed and your photo may be too dark.</p><ul><li>In situations with less light, you'll need a longer shutter speed to properly expose the scene.</li><li>In situations with more light, you will need a shorter shutter speed to properly expose the scene.</li></ul><p>Below are 3 different photos of the same person running, each photo is shot at a progressively faster shutter speed. See if you can notice the effects of shutter speed on the photo.</p><br><img src='images/run_slow.jpg'></img><p>1/15 of a second shutter speed. Notice that the subject is focus but the background is blurred out due to the movement of the camera.</p><br><img src='images/run_medium.jpg'></img><p>1/125 of a second</p><br><img src='images/run_fast.jpg'></img><p>1/800 of a second</p><p>Think about you would adjust your shutter speed given these situations:<ol><li>Outside on a bright, sunny day</li><li>In a dark alley way with very little incoming light</li><li>In a football stadium at night</li></ol><br>",
  "<h1>ISO</h1><p>ISO is the measure of how sensitive your camera is to surrounding light and can be utilized when trying to maintain a fast shutter speed in places with less light.</p> <ul><li>Lower ISO values will be less sensitive to surrounding light, taking a longer amount of time to properly expose surrounding elements.</li> <li>Higher ISO values will be more sensitive to surrounding light, taking a shorter amount to properly expose surrounding elements.</li></ul><p>So, in places such as a dark room or inside a concert hall, increasing your ISO will allow you to capture bright and clear photos while still shooting at a fast shutter speed.</p><p>The photos below were taken in between book shelves in a library. The aperture in all of these photos stays constant. See if you can notice the relationship in between the value of the ISO and the shutter speed</p><br><img src='images/iso_320.jpg'></img><p style='padding-left: 8.5%;'>ISO 320 1/200 </p><br><img src='images/iso_1000.jpg'></img><p style='padding-left: 8.5%;'>ISO 1000 1/640 </p><br><img src='images/iso_6400.jpg'></img><p style='padding-left: 8.5%;'>ISO 6400 1/1250 </p><br><img src='images/iso_12800.jpg'></img><p style='padding-left: 8.5%;'>ISO 12800 1/3200 </p><br><img src='images/iso_24600.jpg'></img><p style='padding-left: 8.5%;'>ISO 25600 1/4000 </p><p>Think about the ISO you would use given these situations:<ol><li>Outside on a bright, sunny day</li><li>In a dark alley way with very little incoming light</li><li>In a football stadium at night</li></ol></p>",
  "<h1>More</h1><p></p>"
];


var pages = tabNames.length;
var tabHeight = 98.5/(2.4*pages);

document.addEventListener("DOMContentLoaded", function (event) {
  //addPages();

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
          }
          else if (i == 2){
            $(".ss").toggleClass("clicked");
          }
          else if (i == 3){
            $(".i").toggleClass("clicked");
          }
          else if (i == 4){
            $(".m").toggleClass("clicked");
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

/*Simply for testing*/
function addPages(){
  for (var i = 0; i < 4; i++){
    tabNames.push("hi");
  }

  pages = tabNames.length;
  tabHeight = 98.5/(pages*2.5);
}
