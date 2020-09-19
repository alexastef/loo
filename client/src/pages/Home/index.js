import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';
import "./style.css";
import { Toast, ToastBody, Spinner } from 'reactstrap';
import LooCard from '../../components/LooCard';

const mapStyles = {
  containerStyle: {
    position: "static"
  },
  toastStyle: {
    position: "absolute",
    bottom: "0px",
    left: "calc(50% - 100px)"
  },
  toastBody: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
};

function Home(props) {
  const [loos, setLoos] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({ lat: 32.76814938481005, lng: -117.05437714392656 });
  const [showRelocateModal, setShowRelocateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // load loos
  useEffect(() => {
    relocate();
  }, []);
  // function displayDBCards(places) {
  //   places.forEach((place, index) => {
  //     createMarker(place, 200 * index);
  //   });
  // }

  function renderLoos() {
    loos.map((loo) => {
      console.log("rendering loo card", loo);
      return <LooCard place={loo}/>;
    });
  }
  function showToast() {
    setLoading(true);
  }

  function hideToast() {
    setLoading(false);
  }
  function relocate() {
    showToast();

    // clearEverything();

    // currentLocationInfoWindow.setPosition(pos);
    // currentLocationInfoWindow.setContent('You are here.');
    // currentLocationInfoWindow.open(map);
    // map.setCenter(pos);

    // send location to api route
    // $.ajax({
    //   url: `/api/nearby/${source}?lat=${pos.lat}&lon=${pos.lng}`,
    //   method: "get",
    // }).then(data => {
    //   console.log(data);
    //   hideToast();
    //   displayPlaces(data, map);
    // });
    console.log(`/api/nearby/home?lat=${center.lat}&lon=${center.lng}`)
    axios.get(`/api/nearby/home?lat=${center.lat}&lon=${center.lng}`)
      .then(response => {
        hideToast();
        setLoos(response.data);
      });
  }

  function mapClicked(mapProps, map, clickEvent) {
    console.log("lat", clickEvent.latLng.lat());
    console.log("lon", clickEvent.latLng.lng());
    const confirmed = window.confirm("Search for establishments here?");
    if (confirmed) {
      setCenter({ lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng() });
    }
    relocate();
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
                initialCenter={center}
                onClick={mapClicked}
              >
                <Marker position={center} title={"my location"}></Marker>
                {loos.map((loo) => {
                  console.log(loo.geometry.location);
                  return <Marker 
                    key={`${loo.geometry.location.lat},${loo.geometry.location.lng}`}
                    position={loo.geometry.location}
                    title={loo.name}
                  ></Marker>;
                })}
              </Map>
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
            <div className="looCards">
              {
                loos.map((loo) => {
                  console.log("rendering loo card", loo);
                  return <LooCard place={loo}/>;
                })
              }
            </div>
          </div>
        </div>
      </div>
      <Toast isOpen={loading} style={mapStyles.toastStyle}>
        <ToastBody style={mapStyles.toastBody}>
          <Spinner />
          &nbsp;
          Loading Loos...
        </ToastBody>
      </Toast>
    </div>
  )
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_MAPS_API_KEY })(Home);