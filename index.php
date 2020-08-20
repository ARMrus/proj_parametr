<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Proj4</title>
<style type="text/css">
	body {font: normal 10px Verdana, Arial, sans-serif;}
	table {border-collapse: collapse;}
	table, th, td {border: 1px solid silver; padding: 1px 2px; }
	tr {background: #ffffff; color: #4a4a4a;}
	input[type="text"] {border: 0px solid #cccccc; border-radius: 0px; background:  inherit; outline: none; color: inherit;}
	select {border-radius: 0; background: #eeeeee; font-size: 10px; padding: 1px; border: 1; line-height: 1; width: 100%;}
	button {background-color: #eeeeee; border: none; padding: 3px 3px; text-align: center; font-size: 10px; text-decoration: none; width: 100%;}
</style>
<script src="js/js_main.js"></script>
<script src="js/proj2.6.js"></script>
<script src="js/conform.js"></script>

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
</head>
<body onload="mnnrefresh()">
  <?php
  include('proj.html');
  ?>
</body>
</html>
