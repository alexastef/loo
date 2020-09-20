import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Toast, ToastBody, Spinner } from 'reactstrap';
import axios from 'axios';
import PlaceCard from '../../components/PlaceCard';

const styles = {
  map: {
    height: "500px"
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

function Search(props) {
  const [center, setCenter] = useState({ lat: 32.76814938481005, lng: -117.05437714392656 });
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    relocate();
  }, []);

  function relocate() {
    setLoading(true);

    console.log(`/api/nearby/search?lat=${center.lat}&lon=${center.lng}`)
    axios.get(`/api/nearby/search?lat=${center.lat}&lon=${center.lng}`)
      .then(response => {
        setLoading(false);
        setPlaces(response.data);
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
      <div className="row">
        <div className="col-sm">
          {/* <!-- This file needs a search bar --> */}
          <form id="searchForm" className="member-name">
            <div className="input-group mb-3">
              <input id="searchInput" type="text" className="form-control" placeholder="Lookin for new loo?"
                aria-label="Lookin for a new loo?" aria-describedby="button-addon2" />
              <div className="input-group-append">
                <button type="submit" href="/details" className="btn btn-outline-secondary btn-light" type="button"
                  id="searchBtn"><i className="fas fa-search"></i></button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* <!-- If user does not search, map with nearby populates --> */}
      <div className="row">
        <div className="col-sm">
          <h6><small className="smallHeader">Click a spot on the map to find other places</small></h6>
          {/* <div className="searchMap" id="map">{{ map }}</div> */}
          <Map
            style={styles.map}
            google={props.google}
            zoom={15}
            center={center}
            initialCenter={center}
            onClick={mapClicked}
          ></Map>
        </div>
      </div>

      {/* <!-- If user does search, map will populate with that location, this needs to be determined in the JS --> */}

      <div id="placeCards" className="row">
        {/* <!--partials will go here as cards in separate columns --> */}
        {
          places.map((place) => {
            return <PlaceCard place={place} />
          })
        }
      </div>
      <Toast isOpen={loading} style={styles.toastStyle}>
        <ToastBody style={styles.toastBody}>
          <Spinner />
          &nbsp;
          Loading Places...
        </ToastBody>
      </Toast>
    </div>
  )
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_MAPS_API_KEY })(Search);
