<!--// Copyright © 2020 Ryabov Alex
// Contacts:
//  email: armrus@armrus.org
//  url: armrus.org
//  tel: +79119220535
// License: https://git.armrus.org/open-source/gis/proj_parametr/blob/master/COPYING

/*
This file is part of proj_parametr.

    proj_parametr is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    proj_parametr is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with proj_parametr.  If not, see <https://www.gnu.org/licenses/>.

  (Этот файл — часть proj_parametr.

   proj_parametr - свободная программа: вы можете перераспространять ее и/или
   изменять ее на условиях Стандартной общественной лицензии GNU в том виде,
   в каком она была опубликована Фондом свободного программного обеспечения;
   либо версии 3 лицензии, либо (по вашему выбору) любой более поздней
   версии.

   proj_parametr распространяется в надежде, что она будет полезной,
   но БЕЗО ВСЯКИХ ГАРАНТИЙ; даже без неявной гарантии ТОВАРНОГО ВИДА
   или ПРИГОДНОСТИ ДЛЯ ОПРЕДЕЛЕННЫХ ЦЕЛЕЙ. Подробнее см. в Стандартной
   общественной лицензии GNU.

   Вы должны были получить копию Стандартной общественной лицензии GNU
   вместе с этой программой. Если это не так, см.
   <https://www.gnu.org/licenses/>.)
 -->
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
	#map {
		width: 100%;
		height: 600px;
	}
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
<script>
	const url = "projbin.php";
</script>
</head>
<body>
  <?php
  include('proj.html');
  ?>
</body>
</html>
