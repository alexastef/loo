import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


  
    // Getting references to our form and inputs
    const email = document.querySelector("input#inputEmail");
    const password = document.querySelector("input#inputPassword");

    function Login () {
        const handleFormSubmit = event => {
            // When the form is submitted, prevent its default behavior, get recipes update the recipes state
            event.preventDefault();
           
    // When the form is submitted, we validate there's an email and password entered
 
      document.querySelector("#errorMessage").textContent();
  
      let userData = {
        email: email.val().trim(),
        password: password.val().trim(),
      };
  
      if (!userData.email || !userData.password) {
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData);
  
      email.val("");
      password.val("");
    };
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(userData) {
      axios.post("/api/login", userData)
        .then(function (data, status) {
          console.log(status);
          console.log(data);
  
          const params = new URLSearchParams(window.location.search);
          const destination = params.get("destination");
  
          if (destination) {
            window.location.replace("/" + destination);
          } else {
            window.location.replace("/");
          }
        })
        // If there's an error, log the error
        .catch(function (err) {
          if (err.status === 401) {
            console.log(err.responseJSON.message);
          }
          console.log(err);
        });
    }
  
  return (
  <div className="container">
    <div className="card" id="loginCard">
      <div className="card-header">Log In
      </div>
        <div className="card-body">
          <form className="login" action="/login" method="post">
            <div className="form-group loginForm">
              <label for="inputEmail">Email Address
              </label>
              <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Email">
              </input>
            </div>
          <div className="form-group">
            <label for="inputPassword">Password
            </label>
            <input type="password" className="form-control" id="inputPassword" placeholder="Password">
            </input>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="rememberUser">
            </input>
            <label className="form-check-label" for="remember">Stay signed in
            </label>
          </div>
          <button type="submit" className="btn btn-primary alt-btn" value = "Log In" onClick={handleFormSubmit}>Login!
          </button>
          <label id="errorMessage" className="text-danger">
          </label>
        </form>
        <br />
        <p>Or sign up <Link to="/signup" role="button" className="btn btn-link">here</Link>
        </p>
      </div>
    </div>
    </div>
  )
};

 export default Login;