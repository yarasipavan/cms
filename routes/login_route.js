var express = require("express");
var db = require("../database");
var router = express.Router();
var bodyparser = require("body-parser");
var session = require("express-session");

var encoder = bodyparser.urlencoded();

router.get("/", (req, res, next) => {
  res.render("login");
});
router.post("/login", encoder, function (req, res) {
  var emailAddress = req.body.email;
  var password = req.body.password;
  var sql = "SELECT * FROM userlogin WHERE emailid=? AND password=?";
  db.query(sql, [emailAddress, password], function (err, data, fields) {
    if (err) throw err;
    if (data.length > 0) {
      var row;
      Object.keys(data).forEach(function (key) {
        row = data[key];
      });
      /*req.session.userId=emailAddress;*/
      req.session.loggedin = true;
      req.session.emailid = emailAddress;
      req.session.uname = row.name;
      res.redirect("/user");
    } else {
      res.render("login", { alertMsg: "Invalid Credentials" });
    }
  });
});

router.post("/authlogin", encoder, function (req, res) {
  var emailAddress = req.body.email_auth;
  var password = req.body.password_auth;
  var sql = "SELECT * FROM authlogin WHERE emailid=? AND password=?";
  db.query(sql, [emailAddress, password], function (err, data, fields) {
    if (err) throw err;
    if (data.length > 0) {
      var row;
      Object.keys(data).forEach(function (key) {
        row = data[key];
      });
      req.session.loggedinAuth = true;
      req.session.emailAddress = row.emailid;
      req.session.name = row.name;
      if (row.department == "Electrical") res.redirect("/electric");
      else if (row.department == "Plumbing") res.redirect("/plumbing");
      else if (row.department == "Civil") res.redirect("/civil");
      // res.render('login',{alertMsg:"Invalid Credentials"});
    } else {
      res.render("login", { alertMsg: "Invalid Credentials" });
    }
  });
});

module.exports = router;
