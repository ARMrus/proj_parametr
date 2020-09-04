<?php
// Copyright © 2020 Ryabov Alex
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
*/
ini_set('display_errors', true);
error_reporting(E_ALL);
// print_r($_POST);
//gdalsrsinfo  -V -e -o all "+proj=omerc +lat_0=59.8338730825 +lonc=29.9351669792 +alpha=-0.00001 +k=1.0000175220647542 +x_0=2193212.730322072 +y_0=425057.6548207395 +gamma=0.8783860937457706 +ellps=krass"
//echo $_POST['data'];
// exec('gdalsrsinfo -V -o 0 '.$_POST['data'],$out);
// $srs['Validate'] = implode($out);
// $out = [];
//
// exec('gdalsrsinfo -e -o 0 '.$_POST['data'],$out);
// $srs['EPSG'] = implode($out);
// $out = [];
//
// exec('gdalsrsinfo -o PROJJSON '.$_POST['data'],$out);
// $srs['PROJJSON'] = implode($out);
// $out = [];
//
// exec('gdalsrsinfo -o wkt1 '.$_POST['data'],$out);
// $srs['wkt1'] = implode($out);
// $out = [];
//
// exec('gdalsrsinfo -o wkt '.$_POST['data'],$out);
// $srs['wkt'] = implode($out);
// $out = [];

exec('gdalsrsinfo -o wkt_esri '.$_POST['data'],$out);
$srs['wkt_esri'] = implode($out);
$out = [];

exec('gdalsrsinfo -o mapinfo '.$_POST['data'],$out);
$srs['mapinfo'] = implode($out);
$out = [];

// exec('gdalsrsinfo -o xml '.$_POST['data'],$out);
// $srs['xml'] = implode($out);
// $out = [];

echo json_encode($srs);
// echo exec('gdalsrsinfo  -V -e -o all "+proj=omerc +lat_0=59.8338730825 +lonc=29.9351669792 +alpha=-0.00001 +k=1.0000175879708246 +x_0=2193212.734006126 +y_0=425057.66367951926 +gamma=0.8784073860913444 +ellps=krass"');
?>
