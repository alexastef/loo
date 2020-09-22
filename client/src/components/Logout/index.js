import React from "react";
import favicon from "../../assets/img/favicon-teal.png";
import bano from "../../assets/img/bano.jpeg";
import "./style.css";


function Logout() {

    return (
        <div className="container">
            <div className="card" id="logOutCard">
                <div className="card-header">
                    <h1 className="bye">Too-dah-Loo!
                        <img src={favicon} alt="Loo" style={{ width: 70 }} />
                    </h1>
                </div>
                <div className="card-body" id="tile">
                    <img src={bano} alt="Loo" class="bano" />
                </div>
                <div className="card-footer">
                    <h3 className="final">Come Again Soon...</h3>
                </div>
            </div>
        </div>
    )
};

export default Logout; 