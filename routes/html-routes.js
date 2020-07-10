var path = require("path");

module.exports = function(app) {
  app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"../public/html/maptest.html"));
  });
};