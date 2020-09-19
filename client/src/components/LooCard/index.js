import React from 'react';

function LooCard(props) {
  return (
    <div className="card dbLoo mb-3">
      <div className="card-body d-flex flex-column">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-wrap home-title">{props.place.name}</h5>
          <div className="card-text text-wrap home-text">{props.place.formatted_address}</div>
          <div className="features-icons"></div>
          <a className="btn btn-primary stretched-link clearfix mt-2" href={`/details/${place.place_id}`} >View Loo Info</a>

        </div>
      </div>
    </div>
  )
}

export default LooCard;
