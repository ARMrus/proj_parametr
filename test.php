<!DOCTYPE html>
<html lang="ru" dir="ltr">

<head>
  <meta charset="utf-8">
  <script src="js/js_main.js"></script>
  <script src="js/proj2.6.js"></script>
  <script src="js/conform.js"></script>

  <script src="test.geojson.js"></script>

  <!-- leaflet -->
  <link rel="stylesheet" href="css/leaflet.css" />
  <link rel="stylesheet" href="css/leaflet.awesome-markers.css" />
  <script src="js/leaflet.js"></script>
  <script src="js/leaflet.restoreview.js"></script>
  <script src="js/leaflet.awesome-markers.js"></script>
  <script src="js/map.js"></script>
    <style>
      #map {
        width: 100%;
        height: 600px;
      }
    </style>
  <title>Для теста расчета</title>
</head>

<body>
  <input id="projselect" type="text" value="omerc">
  <input id="ellps" type="text" value="krass">
  <table>
    <tbody>
          <tr>
            <td></td>
            <td>ГГС</td>
            <td>Хгр</td>
            <td>Угр</td>
            <td>Хм</td>
            <td>Ум</td>
          </tr>
          <tr>
            <td></td>
            <td>Марьино (959)</td>
            <td><input id="0" type="text" name="XXX" value="29.935198"></td>
            <td><input id="0" type="text" name="YYY" value="59.8338730825"></td>
          </tr>
          <tr name="th">
            <td><input type="checkbox" name="active" checked></td>
            <td>Аннинно (900)</td>
            <td><input type="text" name="XXX" value="30.0412923373"></td>
            <td><input type="text" name="YYY" value="59.7795946807"></td>
            <td><input type="text" name="MXX" value="2199080.76"></td>
            <td><input type="text" name="MYY" value="418924.47"></td>
          </tr>
          <tr name="th">
            <td><input type="checkbox" name="active" checked></td>
            <td>Егерская слобода (993)</td>
            <td><input type="text" name="XXX" value="29.840390224"></td>
            <td><input type="text" name="YYY" value="59.8679694038"></td>
            <td><input type="text" name="MXX" value="2187961.87"></td>
            <td><input type="text" name="MYY" value="428941.23"></td>
          </tr>
          <tr name="th">
            <td><input type="checkbox" name="active" checked></td>
            <td>Новополье (960)</td>
            <td><input type="text" name="XXX" value="29.9999211612"></td>
            <td><input type="text" name="YYY" value="59.8301622944"></td>
            <td><input type="text" name="MXX" value="2196837.89"></td>
            <td><input type="text" name="MYY" value="424590.33"></td>
          </tr>
          <tr name="th">
            <td><input type="checkbox" name="active" checked></td>
            <td>Марьино (959)</td>
            <td><input type="text" name="XXX" value="29.9351669792"></td>
            <td><input type="text" name="YYY" value="59.8338730825"></td>
            <td><input type="text" name="MXX" value="2193212.72"></td>
            <td><input type="text" name="MYY" value="425057.63"></td>
          </tr>
        </tbody>

  </table>
  <button type="button" onClick="poj_parametr()">PROJ!</button>
  <div id='map'></div>
  <script>
    var map = L.map('map', {
      maxZoom: 40,
      layers: [],
      zoom: 10,
  		center:[60, 29.99]
    });


    map.restoreView();
   //   map.setView([60, 29.99], 10);

    //===============================================


    var layer_OSM_streets =
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        id: 'mapbox.streets',
        maxZoom: 40
      }).addTo(map);

    // выбор карт тут: https://leaflet-extras.github.io/leaflet-providers/preview/

    var World_Physical_Map = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 40
    });


    //===============================================
    //Задание основных слоев. Два слоя карты и два слоя точек
    var baseLayers = {
      "World_Physical_Map": World_Physical_Map,
      "OSM": layer_OSM_streets
    };


    var Point_wgs = L.layerGroup().addTo(map);
    var Point_msk = L.layerGroup().addTo(map);


    var overlays = {
      "WGS ГГС": Point_wgs,
  	  "MSK ГГС": Point_msk
  	};

    L.control.layers(baseLayers, overlays).addTo(map);
    L.control.scale().addTo(map);

  </script>

</body>


</html>
