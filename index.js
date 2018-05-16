
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('mapContainer'), {
  center: {lat: 40.7291, lng: -73.9965},
  zoom: 13
});


}

function getColorByBoroCD ( id ){
    
    var valBoro =  Math.floor(id/100);
    
    if( valBoro == 1 ) return "#2F4B95"; //blue
    if( valBoro == 2 ) return "#FBE925"; //yellow
    if( valBoro == 3 ) return "#F63F43"; //red
    if( valBoro == 4 ) return "#FD9938"; //orange
    if( valBoro == 5 ) return "#9FCF21"; //green
}

function loadDistricts () {
    
    map.data.loadGeoJson(
      'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');
     
     map.data.setStyle(function(feature) {
          return ({
            
            fillColor: getColorByBoroCD(feature.getProperty("BoroCD")),
            strokeWeight: 1
          });

    });
    
    map.data.addListener('click', function(event) {
         event.feature.setProperty('isColorful', true);
    });
    
    map.data.addListener('mouseover', function(event) {
          map.data.revertStyle();
          map.data.overrideStyle(event.feature, {
              fillColor: getColorByBoroCD(event.feature.getProperty("BoroCD")),
              strokeWeight: 2.5
          });
        });

        map.data.addListener('mouseout', function(event) {
          map.data.revertStyle();
        });

    
    map.setZoom(10);
}


$(document).ready( function (){
 $("#getDistricts").on("click", loadDistricts);   
})

