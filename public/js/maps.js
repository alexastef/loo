$(document).ready(() => {
  // check if Google is available 
  const timer = setInterval(checkGoogle, 100);
  const source = $("#mapsource").data("source");
  let markers = [];
  let currentLocationInfoWindow;
  let geolocationInfoWindow;

  function checkGoogle() {
    console.log("checking Google");
    if (google) {
      clearInterval(timer);
      initMap();
    }
  }

  const mapElement = $("#map")[0];
  function initMap() {
    currentLocationInfoWindow = new google.maps.InfoWindow()
    // start map
    const sandiego = new google.maps.LatLng(32.715, -117.1625);
    map = new google.maps.Map(mapElement, {
      center: sandiego,
      zoom: 15
    });

    map.addListener("click",askToRelocate);

    if (navigator.geolocation) {
      geolocationInfoWindow = new google.maps.InfoWindow();
      navigator.geolocation.getCurrentPosition(function (position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        const latlon = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(pos);

        relocate(pos);

        

      }, function () {
        handleLocationError(true, geolocationInfoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, geolocationInfoWindow, map.getCenter());
    }

  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  function displayPlaces(places, map) {
      // createMarker(place, 200 * index);
      if (source === "home") {
        let dbPlaces = places.dbBathrooms;
        let googlePlaces = places.detailedPlaces;
        console.log("these are the db: ", dbPlaces);
        console.log("these are google returned: ", googlePlaces);
      }
      else if (source === "search") {
        displayCards(places);
      }
  }

  function createMarker(place, delay) {
    setTimeout(() => {

      const marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: place.geometry.location,
        map: map,
        title: place.name,
      });
      markers.push(marker);
    }, delay);
  }

  function askToRelocate(mapEvent) {
    const confirmed = confirm("Search for establishments here?");

    if (confirmed) {
      const pos = {
        lat: mapEvent.latLng.lat(),
        lng: mapEvent.latLng.lng()
      }
      relocate(pos);
    }
  }

  function clearMarkers() {
    markers.forEach((marker) => marker.setMap(null));
    markers = [];
  }

  function relocate(pos) {
    
    console.log("relocate was given:",pos);

    clearEverything();

    currentLocationInfoWindow.setPosition(pos);
    currentLocationInfoWindow.setContent('You are here.');
    currentLocationInfoWindow.open(map);
    map.setCenter(pos);

    // send location to api route
    $.ajax({
      url: `/api/nearby/${source}?lat=${pos.lat}&lon=${pos.lng}`,
      method: "get",
    }).then(data => {
      console.log(data);
      displayPlaces(data, map);
    });
  }

  function clearEverything() {
    // clear the map
    clearMarkers();
    // clear the cards (if exists)
    $("#placeCards").empty();
    geolocationInfoWindow.close();
  }

  $("#searchForm").submit(onSearch);
  function onSearch(event) {
    event.preventDefault();
    const searchValue = $("#searchInput").val().trim();

    clearEverything();

    $.ajax({
      url: "/api/search/"+searchValue,
      method: "get"
    }).then(results => {
      displayCards(results);
    });
  }

  function displayCards(places) {
    places.forEach((place, index) => {
      createMarker(place, 200 * index);

      let cardImgTop;

      const card = $("<div>").addClass("card nearbyCard");
      const cardBody = $("<div>").addClass("card-body");
      const cardTitle = $("<h5>").addClass("card-title").text(place.name);

      const cardText = $("<div>").addClass("card-text").html(place.formatted_address + "<br />" + place.formatted_phone_number);
      const cardLink = $("<a>").addClass("btn btn-primary stretched-link").attr("href","/add/"+place.place_id).text("Add Loo Infoo");
      card.append(cardBody);

      // const row = $("<div>").addClass("row searchCards");

      // row.append(card);

      $("#placeCards").append(card);

      if (place.photos) {
        const firstPhotoRef = place.photos[0].photo_reference;

        $.ajax({
          url: `/api/photo/${firstPhotoRef}`,
          method: "get",
        }).then(photoData => {
          cardImgTop = $("<img>").addClass("card-img-top img-thumbnail img-fluid clearfix").attr("src", photoData).attr("alt", place.name + " image");

          cardBody.append(cardImgTop, cardTitle, cardText,cardLink);
        });
      }
      else {
        cardBody.append(cardTitle, cardText,cardLink);
      }
    });
  }

});