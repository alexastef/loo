$(document).ready(function() {
<<<<<<< HEAD
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#userEmail");
  var passwordInput = $("input#userPassword");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
=======
  const loginForm = $("form.signup");
  const email = $("input#userEmail");
  const password = $("input#userPassword");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: email.val().trim(),
      password: password.val().trim()
>>>>>>> d61f18972a40d74fe3057bb3cadd6662d5958ff0
    };

    if (!userData.email || !userData.password) {
      return;
    }
<<<<<<< HEAD
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
=======

    // If we have an email and password we run the loginUser function and clear the form
    signupUser(userData.email, userData.password);
>>>>>>> d61f18972a40d74fe3057bb3cadd6662d5958ff0
    emailInput.val("");
    passwordInput.val("");
  });

<<<<<<< HEAD
  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
=======
  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function signupUser(email, password) {
>>>>>>> d61f18972a40d74fe3057bb3cadd6662d5958ff0
    $.post("/api/signup", {
      email: email,
      password: password
    })
<<<<<<< HEAD
      .then(function(data) {
        window.location.replace("/add");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
=======
      .then(function() {
        window.location.replace("/addaloo");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
>>>>>>> d61f18972a40d74fe3057bb3cadd6662d5958ff0
