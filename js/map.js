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


//Установка всех точек слоев при нажатии кнопки
//========================================================
function PointAddAll (element, index, array)
//========================================================
{
  if(index < 1)
  {
    //
    Point_wgs.clearLayers();
    Point_msk.clearLayers();
  }


  // Creates a red marker with the coffee icon
  var redMarker = L.AwesomeMarkers.icon({
      icon: 'coffee',
      markerColor: 'red'
    });

    var marker = L.marker([element.wgs_y,element.wgs_x],  {icon: redMarker})
      .bindTooltip(element.name, {
        permanent: true,
        direction: 'right'
      }).addTo(Point_wgs);

    map.setView([element.wgs_y,element.wgs_x], 10);


    // Creates a red marker with the coffee icon
    var greenMarker = L.AwesomeMarkers.icon({
        icon: 'coffee',
        markerColor: 'green'
      });

      var marker = L.marker([element.transform_wgs_y,element.transform_wgs_x],  {icon: greenMarker})
        .bindTooltip(element.name, {
          permanent: true,
          direction: 'right'
        }).addTo(Point_msk);

      map.setView([element.transform_wgs_y,element.transform_wgs_x], 10);
}

//Отображение центральной точки МСК
//========================================================
function center_msk_map (lat, lon)
//========================================================
{
  center_msk.clearLayers();

  // Creates a red marker with the coffee icon
  var blueMarker = L.AwesomeMarkers.icon({
      icon: 'coffee',
      markerColor: 'blue'
    });

    var marker = L.marker([lon,lat],  {icon: blueMarker})
      .bindTooltip('Центр', {
        permanent: true,
        direction: 'right'
      }).addTo(center_msk);

    map.setView([lon,lat], 10);
}
