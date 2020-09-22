import axios from "axios";
import React, { useState } from "react";
import "./style.css";

function LooCard(props) {
  const [photo, setPhotoState] = useState("");

  function showIcons(place) {
    const iconClasses = [];

    if (place.available) {
      iconClasses.push("fas fa-toilet fa-lg features");
    } else if (!place.available) {
      iconClasses.push("fas fa-ban fa-lg features");
    }
    if (place.needs_key) {
      iconClasses.push("fas fa-key fa-lg features");
    }
    if (place.gender_neutral) {
      iconClasses.push("fas fa-transgender-alt fa-lg features");
    }
    if (place.handicap_accessible) {
      iconClasses.push("fab fa-accessible-icon fa-lg features");
    }
    if (place.has_paper) {
      iconClasses.push("fas fa-toilet-paper fa-lg features");
    }
    if (place.has_water) {
      iconClasses.push("fas fa-sink fa-lg features");
    }
    if (place.has_soap) {
      iconClasses.push("fas fa-pump-soap fa-lg features");
    }

    return iconClasses.map((icon) => {
      return <i className={icon} />;
    });
  }

  function checkPhotos(place) {
    if (place.photos) {
      const firstPhotoRef = place.photos[0].photo_reference;

      axios.get(`/api/photo/${firstPhotoRef}`).then((photoData) => {
        const imgSrc = photoData.data;
        setPhotoState(imgSrc);
      });
    }

    return (
      <img
        src={photo}
        className="card-img-top img-thumbnail img-fluid clearfix homeImg"
        alt={place.name}
      />
    );
  }

  return (
    <div className="card dbLoo mb-3">
      <div className="card-body d-flex flex-column">
        <div className="row">
          {checkPhotos(props.place)}
          <div className="address">
            <h5 className="card-title text-wrap home-title">
              {props.place.name}
            </h5>
            <div className="card-text text-wrap home-text">
              {props.place.formatted_address}
            </div>
            <div className="features-icons">{showIcons(props.place)}</div>
          </div>
        </div>
        <a
          className="btn btn-primary stretched-link clearfix mt-2"
          href={`/details/${props.place.place_id}`}
        >
          View Loo Info
        </a>
      </div>
    </div>
  );
}

export default LooCard;
