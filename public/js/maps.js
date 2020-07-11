$(document).ready(() => {
  // check if Google is available 
  const timer = setInterval(checkGoogle,100);

  function checkGoogle() {
    console.log("checking Google");
    if (google) {
      clearInterval(timer);
      initMap();
    }
  }

  const mapElement = $("#map")[0];
  function initMap () {
    // start map
    const sandiego = new google.maps.LatLng(32.715, -117.1625);
    map = new google.maps.Map(mapElement, {
      center: sandiego,
      zoom: 15
    });

  if (navigator.geolocation) {
    const infowindow2 = new google.maps.InfoWindow();
    navigator.geolocation.getCurrentPosition(function (position) {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      const latlon = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      console.log(pos);
      infowindow2.setPosition(pos);
      infowindow2.setContent('You are here.');
      infowindow2.open(map);
      map.setCenter(pos);

      // send location to api route
      $.ajax({
        url: `/api/nearby/?lat=${pos.lat}&lon=${pos.lng}`,
        method: "get",
      }).then(data => {
        console.log(data);
        displayPlaces(data,map);
      });

    }, function () {
      handleLocationError(true, infowindow2, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infowindow2, map.getCenter());
  }

}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function displayPlaces(places,map) {
  places.forEach((place,index) => {
    createMarker(place,200*index);
  });
}

function createMarker(place,delay) {
  setTimeout(() => {
    const marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: place.geometry.location,
      map: map,
      title: place.name
    });
  },delay);
  
}
});