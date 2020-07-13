//Установка всех точек слоев при нажатии кнопки
//========================================================
function PointAddAll (element, index, array)
//========================================================
{
  if(index < 1)
    layerGroup.clearLayers();

  // Creates a red marker with the coffee icon
  var redMarker = L.AwesomeMarkers.icon({
      icon: 'coffee',
      markerColor: 'red'
    });

    var marker = L.marker([element.wgs_y,element.wgs_x],  {icon: redMarker})
      .bindTooltip('text', {
        permanent: true,
        direction: 'right'
      }).addTo(layerGroup);

    map.setView([element.wgs_y,element.wgs_x], 10);
 }
