$(document).ready(function () {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const email = $("input#inputEmail");
  const password = $("input#inputPassword");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function (event) {
    event.preventDefault();

    $("#errorMessage").text();

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
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(userData) {
    $.post("/api/login", userData)
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
        if (err.status == 401) {
          console.log(err.responseJSON.message);

          $("#errorMessage").text(err.responseJSON.message);
        }
        console.log(err);
      });
  }

  $("#signupLink").attr("href", `/signup${window.location.search}`);
  
});
