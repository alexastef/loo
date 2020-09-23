import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import RangeSlider from "react-bootstrap-range-slider";
import "./style.css";

function AddForm(props) {
  const [loo, setLoo] = useState({});
  const [cleanValue, setValue] = useState(5);

  let { id } = useParams();

  // console.log("in the add form: ", place);
  // console.log(props.location.placeProps);
  // useEffect(() => {
  //   axios.get(`/api/loo/${id}`)
  // })
  function moveSlider(evt) {
    // setValue(evt.target.value);
    console.log(evt.target);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg">
        <div className="card" id="addLooCard">
          <div className="card-body">
            <h5 className="card-title">Loo Details</h5>

            <div className="row">
              <div className="col-lg order-md-12 order-lg-1">
                <div className="img-placeholder" />
              </div>
              <div className="col-lg order-md order-lg-12">
                <p className="placeAddress">
                  <h1 className="locationName">Place Name</h1>
                  <p>
                    <span className="streetAddress">Place Address</span>
                    <br />
                    <span className="placePhone">Phone</span>
                  </p>
                </p>
              </div>
            </div>

            <div className="row" />

            <div className="row">
              <div className="col-sm-12">
              <form ClassName="looForm container mt-3" data-place-id={id}>
                <div className="row">
                  <div className="col-sm form-group">
                    <h6>Basics</h6>
                    <div class="custom-control custom-switch form-check">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="looAvailable"
                        checked="true"
                      />
                      <label className="custom-control-label" for="looAvailable">
                        Loo available
                      </label>
                    </div>
                    <div className="custom-control custom-switch form-check">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="needsKey"
                      />
                      <label className="custom-control-label" for="needsKey">
                        Loo needs key
                      </label>
                    </div>
                    <div className="custom-control custom-switch form-check">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="gender"
                      />
                      <label className="custom-control-label" for="gender">
                        Gender neutral loo
                      </label>
                    </div>
                    <div className="custom-control custom-switch form-check">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="accessible"
                      />
                      <label className="custom-control-label" for="accessible">
                        ADA-compliant or accessible
                      </label>
                    </div>
                  </div>
                  <div className="col-sm form-group">
                    <h6>Supplies</h6>
                    <div className="custom-control custom-switch form-check">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="hasWater"
                        checked="true"
                      />
                      <label className="custom-control-label" for="hasWater">
                        Has water
                      </label>
                    </div>
                    <div className="custom-control custom-switch form-check">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="hasSoap"
                        checked="true"
                      />
                      <label className="custom-control-label" for="hasSoap">
                        Has soap
                      </label>
                    </div>
                    <div className="custom-control custom-switch form-check">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="hasPaper"
                        checked="true"
                      />
                      <label className="custom-control-label" for="hasPaper">
                        Has toilet paper
                      </label>
                    </div>
                    <div className="custom-control custom-switch form-check">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="hasMirror"
                        checked="true"
                      />
                      <label className="custom-control-label" for="hasMirror">
                        Has mirror
                      </label>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-12 form-group ">
                    <label for="customRange">
                      <h6>How clean is it?</h6>
                    </label>
                    <div className="input-group d-flex align-items-center">
                      <div className="col-sm-2 text-center">
                        <span className="mr-3">Yuck!</span>
                      </div>
                      <div className="col-sm-8">
                        <RangeSlider min={0} max={10} tooltip="off" size="lg" value={cleanValue} onChange={moveSlider} className="slider" />
                      </div>
                      <div className="col-sm-2 text-center">
                        <span className="ml-3">Sparkling!</span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default AddForm;
