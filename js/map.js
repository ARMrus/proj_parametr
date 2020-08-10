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
