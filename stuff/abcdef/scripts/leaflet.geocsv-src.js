/*
* Copyright 2013 - GPL
* Iván Eixarch <ivan@sinanimodelucro.org>
* https://github.com/joker-x/Leaflet.geoCSV
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 2 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
* MA 02110-1301, USA.
*/

L.GeoCSV = L.GeoJSON.extend({

  //opciones por defecto
  options: {
    titles: ['lat', 'lng', 'popup'],
	  latitudeTitle: 'lat',
	  longitudeTitle: 'lng',
    fieldSeparator: '~',
    lineSeparator: '\n',
    deleteDoubleQuotes: true,
    firstLineTitles: false
  },

  _propertiesNames: [],

  initialize: function (csv, options) {
    L.Util.setOptions (this, options);
    L.GeoJSON.prototype.initialize.call (this, csv, options);
  },

  addData: function (data, tfLayers, valueLayers) {
    if (typeof data === 'string') {
      //leemos csvTitles
      var csvTitles = this.options.titles;
      if (this.options.firstLineTitles) {
        data = data.split(this.options.lineSeparator);
        if (data.length < 2) return;
        csvTitles = data[0];
        data.splice(0,1);
        data = data.join(this.options.lineSeparator);
        csvTitles = csvTitles.trim().split(this.options.fieldSeparator);
        for (var i=0; i<csvTitles.length; i++) {
          csvTitles[i] = this._deleteDoubleQuotes(csvTitles[i]);
        }
        this.options.titles = csvTitles;
      }
      //generamos _propertiesNames
      for (var i=0; i<csvTitles.length; i++) {
         var prop = csvTitles[i].toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_');
         if (prop == '' || prop == '_' || this._propertiesNames.indexOf(prop) >= 0) prop = 'prop-'+i;
         this._propertiesNames[i] = prop;
      }

      data = this._csv2json(data, tfLayers, valueLayers);
    }

    L.GeoJSON.prototype.addData.call (this, data);
  },

  getPropertyName: function (title) {
    var pos = this.options.titles.indexOf(title)
      , prop = '';
    if (pos >= 0) prop = this._propertiesNames[pos];
    return prop;
  },

  getPropertyTitle: function (prop) {
    var pos = this._propertiesNames.indexOf(prop)
      , title = '';
    if (pos >= 0) title = this.options.titles[pos];
    return title;
  },

  _deleteDoubleQuotes: function (cadena) {
    if (this.options.deleteDoubleQuotes) cadena = cadena.trim().replace(/^"/,"").replace(/"$/,"");
    return cadena;
  },

  _csv2json: function (csv, tfLayers, valueLayers) {
   var json = {};
   json["type"]="FeatureCollection";
   json["features"]=[];
   var csvTitles = this.options.titles;
   csv = csv.split(this.options.lineSeparator);

   var temptfLayers = [];
   for (var i in tfLayers){
     temptfLayers[i] = tfLayers[i];
   }

   for (var num_line = 0; num_line < csv.length; num_line++) {
     var fields = csv[num_line].trim().split(this.options.fieldSeparator)
       , lng = parseFloat(fields[csvTitles.indexOf(this.options.longitudeTitle)])
       , lat = parseFloat(fields[csvTitles.indexOf(this.options.latitudeTitle)]);
     if (fields.length==csvTitles.length && lng<180 && lng>-180 && lat<90 && lat>-90) {
       var feature = {};
       feature["type"]="Feature";
       feature["geometry"]={};
       feature["properties"]={};
       feature["geometry"]["type"]="Point";
       feature["geometry"]["coordinates"]=[lng,lat];
       //Add the custom layers to the features
       for (var item in tfLayers){
         feature[tfLayers[item].title] = false;
       }
       for (var item in valueLayers){
         feature[valueLayers[item].type] = "none";
       }

       //Properites
       for (var i=0; i<csvTitles.length; i++) {
         if (csvTitles[i] != this.options.latitudeTitle && csvTitles[i] != this.options.longitudeTitle) {
            feature["properties"][this._propertiesNames[i]] = this._deleteDoubleQuotes(fields[i]);

            //Sorts the true and false values
             for (var item in tfLayers){
               if (tfLayers[item].title == csvTitles[i]){
                 if (feature["properties"][this._propertiesNames[i]]){
                   if (feature["properties"][this._propertiesNames[i]] == "Yes")
                    feature[csvTitles[i]] = true;
                  else{
                      feature[csvTitles[i]] = false;
                  }
                }
               }
             }

             //Sorts the value type values
             for (var item in valueLayers){
               if (valueLayers[item].type == csvTitles[i]){
                 if (feature["properties"][this._propertiesNames[i]]){
                    feature[csvTitles[i]] = feature["properties"][this._propertiesNames[i]];
                  }
               }
             }
         }
       }
       json["features"].push(feature);
     }
   }
   return json;}

});

L.geoCsv = function (csv_string, options) {
  return new L.GeoCSV (csv_string, options);
};
