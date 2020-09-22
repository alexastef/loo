import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, Redirect } from "react-router-dom";

function Login() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");

  function handleInputChange(event) {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
    else {
      setPassword(event.target.value);
    }
  } 

  function handleFormSubmit(event) {
    event.preventDefault();
    loginUser();
  }

  // const handleFormSubmit = event => {
  //   // When the form is submitted, prevent its default behavior, get recipes update the recipes state
  //   event.preventDefault();

  //   // When the form is submitted, we validate there's an email and password entered

  //   document.querySelector("#errorMessage").textContent();

  //   let userData = {
  //     email: email.val().trim(),
  //     password: password.val().trim(),
  //   };

  //   if (!userData.email || !userData.password) {
  //     return;
  //   }

  //   // If we have an email and password we run the loginUser function and clear the form
  //   loginUser(userData);

  //   email.val("");
  //   password.val("");
  // };

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser() {
    const userData = {
      email: email.trim(),
      password: password.trim()
    };
    axios.post("/api/login", userData)
      .then(function (data, status) {
        console.log(status);
        console.log(data);

        const destination = new URLSearchParams(location.search).get("destination");

        if (destination) {
          setRedirectTo("/" + destination);
        } else {
          setRedirectTo("/");
        }
        setRedirect(true);
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
              <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Email" onChange={handleInputChange} value={email} name="email">
              </input>
            </div>
            <div className="form-group">
              <label for="inputPassword">Password
            </label>
              <input type="password" className="form-control" placeholder="Password" onChange={handleInputChange} value={password} name="password">
              </input>
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="rememberUser">
              </input>
              <label className="form-check-label" for="remember">Stay signed in
            </label>
            </div>
            <button type="submit" className="btn btn-primary alt-btn" value="Log In" onClick={handleFormSubmit}>Login!
          </button>
            <label id="errorMessage" className="text-danger">
            </label>
          </form>
          <br />
          <p>Or sign up <Link to="/signup" role="button" className="btn btn-link">here</Link>
          </p>
        </div>
      </div>
      { redirect === true ?  <Redirect to={redirectTo} /> : null}
    </div>
  )
};

export default Login; 