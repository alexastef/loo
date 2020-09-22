import React from 'react';

function PlaceCard(props) {
  return (
    <div className="col-md-6">
      <div className="card nearbyCard mt-3 p-2">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{props.place.name}</h5>
          <div className="card-text">{props.place.formatted_address}</div>
          <a className="btn btn-primary stretched-link clearfix mt-auto" href={`/add/${props.place.place_id}`}>Add Loo Info</a>
        </div>
      </div>
    </div>
  )
}

export default PlaceCard;