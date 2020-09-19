import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import "./style.css";

const mapStyles = {
  containerStyle: {
    position: "static"
  }
};

function Home(props) {
  const [loos, setLoos] = useState([]);
  const [center, setCenter] = useState({ lat: 32.715, lng: -117.1625 });
  const [showRelocateModal, setShowRelocateModal] = useState(false);
  // load loos
  useEffect(() => {
    console.log("process.env", process.env);
  }, []);
  // function displayDBCards(places) {
  //   places.forEach((place, index) => {
  //     createMarker(place, 200 * index);
  //   });
  // }
  // function relocate(pos) {
  //   if (source === 'home') {
  //     showToast('Loading loos...');
  //   }
  //   else {
  //     showToast('Loading places...');
  //   }

  //   console.log("relocate was given:",pos);

  //   clearEverything();

  //   currentLocationInfoWindow.setPosition(pos);
  //   currentLocationInfoWindow.setContent('You are here.');
  //   currentLocationInfoWindow.open(map);
  //   map.setCenter(pos);

  //   // send location to api route
  //   $.ajax({
  //     url: `/api/nearby/${source}?lat=${pos.lat}&lon=${pos.lng}`,
  //     method: "get",
  //   }).then(data => {
  //     console.log(data);
  //     hideToast();
  //     displayPlaces(data, map);
  //   });
  // }

  function mapClicked(mapProps, map, clickEvent) {
    console.log("lat", clickEvent.latLng.lat());
    console.log("lon", clickEvent.latLng.lng());
    const confirmed = window.confirm("Search for establishments here?");
    if (confirmed) {
      setCenter({ lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng() });
    }
    //relocate();
  }

  return (
    <div className="container">
      {/*<!-- Row 1 (map and locations all one row with sub-rows) -->*/}
      <div className="row">
        <div className="col-lg">
          <h4 className="nearbyLoos">Verified Loos Near You</h4>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {/* <!-- Col 1 - Map --> */}
          <div className="col-lg">
            {/* <!-- Sub Row - About Card --> */}
            <div className="card" id="aboutCard">
              <div className="card-header" id="pad">
                <h1 className="hi">Skip &nbsp; to &nbsp; the &nbsp; Loo!</h1>
              </div>
              <div className="card-body" id="texty">
                <p>Our App answers <i>the</i> COVID question:
              Where do I "go"… when I’m “on-the-go”?</p>
                <p className="notey">Are you just lookin' for a Loo?!</p>
                <p> Click on the map to see available “Loos near you”. &nbsp; Please click the yellow button to “Add New Loo” too!</p>
                <p>You can Search, Find, or even Update the information of a bathroom.
                We rely on “Lookie-Loos” like you to help us maintain our water closet collection. Plus, you can help
              alert others to SKIP-a-loo or two! Thank you.</p>
              </div>
            </div>
            {/* <!-- Dynamically generated map --> */}
            <h6><small className="smallHeader">Click a spot on the map to find other loos</small></h6>
            <div className="mapContainer">
              <Map
                containerStyle={mapStyles.containerStyle}
                google={props.google}
                zoom={15}
                center={center}
                onClick={mapClicked}
              ></Map>
            </div>

            {/* <div id="map" className="d-inline-flex p-2"></div> */}
            <div className="row">
              <a href="/search" className="btn btn-warning btn-lg active" role="button" aria-pressed="true" id="addNew"><i
                className="fas fa-plus"></i> New Loo</a>
            </div>
            <div id="mapsource" data-source="home"></div>
          </div>
          {/* <!-- Col 2 - Locations --> */}
          <div className="col-lg">
            <div className="looCards"></div>
          </div>
        </div>
      </div>
      <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Relocate</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Search for loos at this location?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">Yes</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_MAPS_API_KEY })(Home);