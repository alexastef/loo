$(document).ready(function() {
  // Getting references to our form and inputs
<<<<<<< HEAD
  var loginForm = $("form.loginForm");
  var emailInput = $("input#userEmail");
  var passwordInput = $("input#userPassword");
=======
  var loginForm = $("form.login");
  var emailInput = $("input#inputEmail");
  var passwordInput = $("input#inputPassword");
>>>>>>> d61f18972a40d74fe3057bb3cadd6662d5958ff0

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
<<<<<<< HEAD
    $.post("/api/login.handlebars", {
=======
    $.post("/api/login", {
>>>>>>> d61f18972a40d74fe3057bb3cadd6662d5958ff0
      email: email,
      password: password
    })
      .then(function() {
<<<<<<< HEAD
        window.location.replace("/add");
=======
        window.location.replace("/addaloo");
>>>>>>> d61f18972a40d74fe3057bb3cadd6662d5958ff0
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
<<<<<<< HEAD
});
=======
});
>>>>>>> d61f18972a40d74fe3057bb3cadd6662d5958ff0
