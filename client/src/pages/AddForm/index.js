import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import RangeSlider from "react-bootstrap-range-slider";
import axios from "axios";
import "./style.css";

function AddForm(props) {
  console.log(props);
  let { id } = useParams();

  const [loo, setLoo] = useState({
    // should be props.place_id but need to work on passing that info down
    place_id: id,
    isAvailable: true,
    needsKey: false,
    genderNeutral: false,
    isAccessible: false,
    hasWater: true,
    hasSoap: true,
    hasPaper: true,
    hasMirror: true,
    cleanRating: 5
  });

  // const history = useHistory();

  function updateCleanValue(evt) {
    const numberRating = parseInt(evt.target.value);
    setLoo({ ...loo, cleanRating: numberRating });
  }

  function submitLoo() {
    axios.post("/api/bathroom", loo)
      .then(() => {
        console.log("loo successfully added");

        alert("Thanks for adding a loo!");

        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Oops, something went wrong! Try to add your loo later.");
      })
  }

  console.log("loo: ", loo)
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
                  <form className="looForm container mt-3" data-place-id={id}>
                    <div className="row">
                      <div className="col-sm form-group">
                        <h6>Basics</h6>
                        <div className="custom-control custom-switch form-check">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="isAvailable"
                            defaultChecked
                            onChange={() => setLoo(({ isAvailable }) => ({ ...loo, isAvailable: !isAvailable }))}
                          />
                          <label
                            className="custom-control-label"
                            for="isAvailable"
                          >
                            Loo available
                          </label>
                        </div>
                        <div className="custom-control custom-switch form-check">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="needsKey"
                            value={loo.needsKey}
                            onChange={() => setLoo(({ needsKey }) => ({ ...loo, needsKey: !needsKey }))}
                          />
                          <label
                            className="custom-control-label"
                            for="needsKey"
                          >
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
                            onChange={() => setLoo(({ isAccessible }) => ({ ...loo, isAccessible: !isAccessible }))}
                          />
                          <label
                            className="custom-control-label"
                            for="accessible"
                          >
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
                            defaultChecked
                            onChange={() => setLoo(({ hasWater }) => ({ ...loo, hasWater: !hasWater }))}
                          />
                          <label
                            className="custom-control-label"
                            for="hasWater"
                          >
                            Has water
                          </label>
                        </div>
                        <div className="custom-control custom-switch form-check">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="hasSoap"
                            defaultChecked
                            onChange={() => setLoo(({ hasSoap }) => ({ ...loo, hasSoap: !hasSoap }))}
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
                            defaultChecked
                            onChange={() => setLoo(({ hasPaper }) => ({ ...loo, hasPaper: !hasPaper }))}
                          />
                          <label
                            className="custom-control-label"
                            for="hasPaper"
                          >
                            Has toilet paper
                          </label>
                        </div>
                        <div className="custom-control custom-switch form-check">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="hasMirror"
                            defaultChecked
                            onChange={() => setLoo(({ hasMirror }) => ({ ...loo, hasMirror: !hasMirror }))}
                          />
                          <label
                            className="custom-control-label"
                            for="hasMirror"
                          >
                            Has mirror
                          </label>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-sm-12 form-group">
                        <label for="customRange">
                          <h6>How clean is it?</h6>
                        </label>
                        <div className="input-group d-flex align-items-center sliderInput">
                          <div className="col-sm-2 text-center">
                            <span className="mr-1">Yuck!</span>
                          </div>
                          <div className="col-sm-8">
                            <RangeSlider
                              min={0}
                              max={10}
                              tooltip="off"
                              size="lg"
                              value={loo.cleanRating}
                              onChange={updateCleanValue} 
                              className="slider"
                            />
                          </div>
                          <div className="col-sm-2 text-center">
                            <span className="ml-1">Sparkling!</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-lg btn-warning alt-btn"
                      id="addLooBtn"
                      onClick={submitLoo}
                    >
                      Add Loo!
                    </button>
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
