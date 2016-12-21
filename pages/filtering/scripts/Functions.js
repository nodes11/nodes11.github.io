function heightAdjustment() {var height = document.getElementById('map').style.height = height+20+"px";}
//Will create all the layers desired that are listed in tflayers and valueLayers in the index.html file
function createCustomLayers(){
  for (var type in tflayers)
  {
    var cLayer = L.layerGroup();
    cLayer.name = tflayers[type].title;
    allLayers.push(cLayer);
  }
  for (var type in valueLayers){
    var cLayer = L.layerGroup();
    cLayer.name = valueLayers[type].title;
    allLayers.push(cLayer);
  }
}
//Add all the layers to the control with the appropiate names
function updateControl(){
  for (var item in allLayers){
    layerControl.addOverlay(allLayers[item], allLayers[item].name);
  }
}
//Used for making markers unclickable
function onPopupClick(event){
  event.target.closePopup();
}
//Completes the dynamic filtering
function filterstuff(){
    //Remove the baseOverlay, clear all other layers

    //Set currLayers to all layers that are currently checked
    currLayers = layerControl.getActiveOverlayLayers();

    //Make sure all of the layers have all of the possible markers needed
    createValueLayers();

    var isSorted = false;

    var usedTfSets = [];
    var usedValueSets = [];

   //Go through all applied layers
   for (var overlay in currLayers){
       //Add all of the markers in currLayers to one giant layer
       currLayers[overlay]["layer"].eachLayer(function(layer){
            layer.setOpacity(0);
            layer.on('click', onPopupClick);
            tempLayer.addLayer(layer);
       });

       //First we will check our value layers
        for (var item in valueLayers){
          if (valueLayers[item].title == currLayers[overlay]["name"]){
              if (usedValueSets.indexOf(valueLayers[item].type) < 0){
                usedValueSets.push(valueLayers[item].type);
              }
              isSorted = true;
              break;
          }
        }

        if (isSorted == false){
          for (var item in tflayers){
            if (tflayers[item].title == currLayers[overlay]["name"])
            {
              if (usedTfSets.indexOf(tflayers[item].set) < 0){
                usedTfSets.push(tflayers[item].set);
              }
              isSorted = true;
              break;
            }
          }
        }

        isSorted = false;
    }

    var currLayersSize = 0;

    //Determine the number of layers needed for a marker to be valid
    if (usedValueSets.length > 0){
        currLayersSize += usedValueSets.length;
    }
    if (usedTfSets.length > 0){
      currLayersSize += usedTfSets.length;
    }

    //Go through each marker in tempLayer
    tempLayer.eachLayer(function(layer){
        var validMarker = 0;
        //Compare the name of each layer in currLayer to that of marker in tempLayer
        for (var overlay in currLayers){
            var name = currLayers[overlay]["name"];
            for (var item in layer.feature){
              if (layer.feature[item] == name){
                validMarker += 1;
                break;
              }
            }
            if (layer.feature[name] == true){
               validMarker += 1;
            }
        }
        if  (validMarker >= currLayersSize){
            layer.setOpacity(1);
            layer.off('click', onPopupClick);
        }
    });

    if (currLayers){
      currLayers = L.layerGroup();
    }
}
//
function createTFBases(){
    baseOverlay.eachLayer(function(layer){
        for (var tLayer in allLayers){
          if (layer.feature[allLayers[tLayer].name] == true || layer.feature[allLayers[tLayer].name] == "true" || layer.feature[allLayers[tLayer].name] == "Yes" || layer.feature[allLayers[tLayer].name] == "yes"){
            allLayers[tLayer].addLayer(layer);
          }
        }
    });
    updateControl();
}
//
function createTFLayers(temp){
    for (var overlay in currLayers){
      tfFilter(currLayers[overlay]["layer"]);
    }
}
//
function tfFilter(temp){
  baseOverlay.eachLayer(function(layer){
    for (var item in tflayers){
      if (layer.feature[tflayers[item].title] == true || layer.feature[tflayers[item].title] == "true" || layer.feature[tflayers[item].title] == "Yes" || layer.feature[tflayers[item].title] == "yes"){
        temp.addLayer(layer);
      }
    }
  });
}
//Will be called when a new layer is added to the map
function createBaseValueLayers(){
    //Creating dynamic year layers
    for (var overlay in allLayers){
      valueFilter(allLayers[overlay]);
    }
}
//Will be called when a new layer is added to the map
function createValueLayers(){
    //Creating dynamic year layers
    for (var overlay in currLayers){
        valueFilter(currLayers[overlay]["layer"]);
    }
}
//Takes a layer and adds it to the appropiate year layer
function valueFilter(temp){
    baseOverlay.eachLayer(function(layer){
      for (var item in valueLayers){
        if (layer.feature.hasOwnProperty(valueLayers[item].type)){
          if (layer.feature[valueLayers[item].type] == temp.name){
              temp.addLayer(layer);
          }
        }
      }
    });
}
// Read the specified text file and
function readfile(f) {
  var reader = new FileReader();
  reader.readAsText(f);
  var text;
  reader.onload = function() {
    text = reader.result;
  }
  reader.onerror = function(e) { // If anything goes wrong
    console.log("Error", e);
  }

  return text;
}
//Parse the Price value
function parsePrice(p){
  var np = "";
  j = 0;
  np += '$';
  for (var i in p){
    if (p[i] == "-"){
      np += p[i];
      np += '$'
    }
    else{
      np += p[i];
    }
  }

  return np;
}
