//npm packages
const express = require("express");
const session = require("express-session");
let passport = require("./config/passport");
const flash = require('connect-flash');

// Setting up port and requiring models
const PORT = process.env.PORT || 8080;
const db = require("./models");

//EXPRESS
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//HANDLEBARS
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sessions- track our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//ROUTES
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Sync databate with sequelize
db.sequelize.sync().then(function() {
app.listen(PORT, function() {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
});
