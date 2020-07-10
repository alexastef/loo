// Set up MySQL  and connect it to Node!
const mysql = require("mysql");
const config = require(__dirname + '/../config/config.json');

const connection = mysql.createConnection(config.development);

// Makes a connection.
connection.connect((err)=> {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Exports connection for ORM.
module.exports = connection;