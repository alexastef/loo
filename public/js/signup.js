$(document).ready(function() {
  const loginForm = $("form.signup");
  const email = $("input#userEmail");
  const password = $("input#userPassword");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: email.val().trim(),
      password: password.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    signupUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function signupUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/addaloo");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});