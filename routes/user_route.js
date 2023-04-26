var express = require("express");
var db = require("../database");
var router = express.Router();
var bodyparser = require("body-parser");
var session = require("express-session");
var encoder = bodyparser.urlencoded();

const redirectLogin = (req, res, next) => {
  if (!req.session.loggedin && !req.session.emailid) {
    res.redirect("/");
  } else {
    next();
  }
};
router.get("/user", redirectLogin, function (req, res, next) {
  res.render("User/user_home", { username: req.session.uname });
});
router.get("/user/userreset", redirectLogin, function (req, res) {
  res.render("User/user_reset", {
    username: req.session.uname,
  });
});
router.get("/user/electriclaunch", redirectLogin, function (req, res) {
  var email = req.session.emailid;
  var sql1 = "SELECT name from locations";
  db.query(sql1, function (err1, data1) {
    if (err1) throw err1;
    res.render("User/electric_launch", {
      username: req.session.uname,
      location: data1,
      divdisable: "hidden",
    });
  });
  /* var sql="SELECT * from electriccomplaints WHERE mailid=? and status!='completed'";
        db.query(sql,[email],function(err,data)
        {
            if(err) throw err;
            if(data.length==0)
            {   var sql1='SELECT name from locations';
                db.query(sql1,function(err1,data1)
                {
                    if (err1) throw err1;
                    res.render('User/electric_launch',{
                        username:req.session.uname,location:data1,divenable:"hidden"
                    });
                })
            }
            else
            {
                var sql1='SELECT name from locations';
                db.query(sql1,function(err1,data1)
                {
                    if (err1) throw err1;
                    res.render('User/electric_launch',{
                        username:req.session.uname,location:data1,divdisable:"hidden"
                    });
                })
            }*/
});

router.get("/user/plumbinglaunch", redirectLogin, function (req, res) {
  var email = req.session.emailid;
  var sql1 = "SELECT name from plumbinglocations";
  db.query(sql1, function (err1, data1) {
    if (err1) throw err1;
    res.render("User/plumbing_launch", {
      username: req.session.uname,
      location: data1,
      divdisable: "hidden",
    });
  });
});

//civil request launch
router.get("/user/civillaunch", redirectLogin, function (req, res) {
  var email = req.session.emailid;
  var sql1 = "SELECT name from civillocations";
  db.query(sql1, function (err1, data1) {
    if (err1) throw err1;
    res.render("User/civil_launch", {
      username: req.session.uname,
      location: data1,
      divdisable: "hidden",
    });
  });
});

router.get("/user/electricstatus", redirectLogin, function (req, res) {
  var email = req.session.emailid;
  var sql =
    "SELECT * from electriccomplaints WHERE mailid=? and status!='completed'";
  db.query(sql, [email], function (err, data) {
    if (err) throw err;
    var sql1 = "SELECT * from electricians";
    db.query(sql1, function (err1, data1) {
      if (err1) throw err1;
      res.render("User/electric_status", {
        username: req.session.uname,
        details: data,
        elename: data1,
      });
    });
  });
});
router.get("/user/plumbingstatus", redirectLogin, function (req, res) {
  var email = req.session.emailid;
  var sql =
    "SELECT * from plumbingcomplaints WHERE mailid=? and status!='completed'";
  db.query(sql, [email], function (err, data) {
    if (err) throw err;
    var sql1 = "SELECT * from plumbers";
    db.query(sql1, function (err1, data1) {
      if (err1) throw err1;
      res.render("User/plumbing_status", {
        username: req.session.uname,
        details: data,
        elename: data1,
      });
    });
  });
});
router.get("/user/civilstatus", redirectLogin, function (req, res) {
  var email = req.session.emailid;
  var sql =
    "SELECT * from civilcomplaints WHERE mailid=? and status!='completed'";
  db.query(sql, [email], function (err, data) {
    if (err) throw err;
    var sql1 = "SELECT * from civilworkers";
    db.query(sql1, function (err1, data1) {
      if (err1) throw err1;
      res.render("User/civil_status", {
        username: req.session.uname,
        details: data,
        elename: data1,
      });
    });
  });
});
router.get("/user/electricall", redirectLogin, function (req, res) {
  var email = req.session.emailid;
  res.render("User/electric_all", { username: req.session.uname });
  /* var sql="SELECT * from electriccomplaints WHERE mailid=?";
        db.query(sql,[email],function(err,data)
        {
            if(err) throw err;
            var sql1="SELECT * from electricians";
            db.query(sql1,function(err1,data1){
                if(err1) throw err1;
                res.render('User/electric_all',{username:req.session.uname,details:data,elename:data1});
            })
            
        })*/
});
router.get("/user/plumbingall", redirectLogin, function (req, res) {
  var email = req.session.emailid;
  res.render("User/plumbing_all", { username: req.session.uname });
});

router.get("/user/civilall", redirectLogin, function (req, res) {
  var email = req.session.emailid;
  res.render("User/civil_all", { username: req.session.uname });
});

router.get("/userprofile", function (req, res) {
  res.render("User/user_profile", {
    username: req.session.uname,
    gmail: req.session.emailid,
  });
});
router.get("/get_all_complaints", function (request, response, next) {
  var draw = request.query.draw;

  var start = request.query.start;

  var length = request.query.length;

  var order_data = request.query.order;

  if (typeof order_data == "undefined") {
    var column_name = "cid";

    var column_sort_order = "desc";
  } else {
    var column_index = request.query.order[0]["column"];

    var column_name = request.query.columns[column_index]["data"];

    var column_sort_order = request.query.order[0]["dir"];
  }

  //search data

  var search_value = request.query.search["value"];

  var search_query = `
     AND (name LIKE '%${search_value}%' 
      OR date LIKE '%${search_value}%' 
      OR complaint LIKE '%${search_value}%'
      OR description LIKE '%${search_value}%'
      OR location LIKE '%${search_value}%'
      OR status LIKE '%${search_value}%'
      OR eid LIKE '%${search_value}%'
     )
    `;
  //Total number of records without filtering
  var sql = "SELECT COUNT(*) AS Total FROM electriccomplaints WHERE mailid=?";
  db.query(sql, [request.session.emailid], function (error, data) {
    var total_records = data[0].Total;
    //Total number of records with filtering
    db.query(
      `SELECT COUNT(*) AS Total FROM electriccomplaints left join electricians on electriccomplaints.eid=electricians.id WHERE mailid='${request.session.emailid}' ${search_query}`,
      function (error, data) {
        var total_records_with_filter = data[0].Total;
        var query = `
            SELECT * FROM electriccomplaints left join electricians on electriccomplaints.eid=electricians.id
            WHERE mailid='${request.session.emailid}' ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;

        var data_arr = [];

        db.query(query, function (error, data) {
          var c = 0;
          data.forEach(function (row) {
            c++;
            data_arr.push({
              row_number: c,
              cid: row.cid,
              date: row.date,
              complaint: `<b>${row.complaint}</b><br>${row.description}`,
              location: `<b>${row.location}</b><br>${row.locationdes}`,
              status: row.status,
              eid: row.name,
            });
          });

          var output = {
            draw: draw,
            iTotalRecords: total_records,
            iTotalDisplayRecords: total_records_with_filter,
            aaData: data_arr,
          };

          response.json(output);
        });
      }
    );
  });
});
router.get("/plumbing_get_all_complaints", function (request, response, next) {
  var draw = request.query.draw;

  var start = request.query.start;

  var length = request.query.length;

  var order_data = request.query.order;

  if (typeof order_data == "undefined") {
    var column_name = "cid";

    var column_sort_order = "desc";
  } else {
    var column_index = request.query.order[0]["column"];

    var column_name = request.query.columns[column_index]["data"];

    var column_sort_order = request.query.order[0]["dir"];
  }

  //search data

  var search_value = request.query.search["value"];

  var search_query = `
     AND (name LIKE '%${search_value}%' 
      OR date LIKE '%${search_value}%' 
      OR complaint LIKE '%${search_value}%'
      OR description LIKE '%${search_value}%'
      OR location LIKE '%${search_value}%'
      OR status LIKE '%${search_value}%'
      OR pid LIKE '%${search_value}%'
     )
    `;

  //Total number of records without filtering
  var sql = "SELECT COUNT(*) AS Total FROM plumbingcomplaints WHERE mailid=?";
  db.query(sql, [request.session.emailid], function (error, data) {
    var total_records = data[0].Total;
    //Total number of records with filtering
    db.query(
      `SELECT COUNT(*) AS Total FROM plumbingcomplaints left join plumbers on plumbingcomplaints.pid=plumbers.id WHERE mailid='${request.session.emailid}' ${search_query}`,
      function (error, data) {
        var total_records_with_filter = data[0].Total;
        var query = `
            SELECT * FROM plumbingcomplaints left join plumbers on plumbingcomplaints.pid=plumbers.id
            WHERE mailid='${request.session.emailid}' ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;

        var data_arr = [];

        db.query(query, function (error, data) {
          var c = 0;
          data.forEach(function (row) {
            c++;
            data_arr.push({
              row_number: c,
              cid: row.cid,
              date: row.date,
              complaint: `<b>${row.complaint}</b><br>${row.description}`,
              location: `<b>${row.location}</b><br>${row.locationdes}`,
              status: row.status,
              pid: row.name,
            });
          });

          var output = {
            draw: draw,
            iTotalRecords: total_records,
            iTotalDisplayRecords: total_records_with_filter,
            aaData: data_arr,
          };

          response.json(output);
        });
      }
    );
  });
});

router.get("/civil_get_all_complaints", function (request, response, next) {
  var draw = request.query.draw;

  var start = request.query.start;

  var length = request.query.length;

  var order_data = request.query.order;

  if (typeof order_data == "undefined") {
    var column_name = "cid";

    var column_sort_order = "desc";
  } else {
    var column_index = request.query.order[0]["column"];

    var column_name = request.query.columns[column_index]["data"];

    var column_sort_order = request.query.order[0]["dir"];
  }

  //search data

  var search_value = request.query.search["value"];

  var search_query = `
     AND (name LIKE '%${search_value}%' 
      OR date LIKE '%${search_value}%' 
      OR complaint LIKE '%${search_value}%'
      OR description LIKE '%${search_value}%'
      OR location LIKE '%${search_value}%'
      OR status LIKE '%${search_value}%'
      OR workerid LIKE '%${search_value}%'
     )
    `;

  //Total number of records without filtering
  var sql = "SELECT COUNT(*) AS Total FROM civilcomplaints WHERE mailid=?";
  db.query(sql, [request.session.emailid], function (error, data) {
    var total_records = data[0].Total;
    //Total number of records with filtering
    db.query(
      `SELECT COUNT(*) AS Total FROM civilcomplaints left join civilworkers on civilcomplaints.workerid=civilworkers.id WHERE mailid='${request.session.emailid}' ${search_query}`,
      function (error, data) {
        var total_records_with_filter = data[0].Total;
        var query = `
            SELECT * FROM civilcomplaints left join civilworkers on civilcomplaints.workerid=civilworkers.id
            WHERE mailid='${request.session.emailid}' ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;

        var data_arr = [];

        db.query(query, function (error, data) {
          var c = 0;
          data.forEach(function (row) {
            c++;
            data_arr.push({
              row_number: c,
              cid: row.cid,
              date: row.date,
              complaint: `<b>${row.complaint}</b><br>${row.description}`,
              location: `<b>${row.location}</b><br>${row.locationdes}`,
              status: row.status,
              workerid: row.name,
            });
          });

          var output = {
            draw: draw,
            iTotalRecords: total_records,
            iTotalDisplayRecords: total_records_with_filter,
            aaData: data_arr,
          };

          response.json(output);
        });
      }
    );
  });
});

// module.exports = router;

router.post("/ureset", encoder, function (req, res) {
  var current = req.body.inputPasswordOld.trim();
  var newpassword = req.body.inputPasswordNew.trim();
  var emailAddress = req.session.emailid;
  var name = req.session.uname;
  var sql = "UPDATE userlogin SET password=? WHERE emailid=? AND password=?";
  db.query(
    sql,
    [newpassword, emailAddress, current],
    function (err, data, fields) {
      if (err) throw err;
      if (data.affectedRows == 0) {
        res.render("User/user_reset", {
          alertMsg: "Current Password is Wrong",
          username: name,
          alertclass: "alert alert-danger",
        });
      } else {
        res.render("User/user_reset", {
          alertMsg: "Updated Successfully!",
          username: name,
          alertclass: "alert alert-success",
        });
      }
    }
  );
});
router.post("/newrequest", encoder, redirectLogin, function (req, res) {
  var email = req.session.emailid;
  var service = req.body.Service;
  var sdes = req.body.Servicedes;
  var loc = req.body.Location;
  var locdes = req.body.Locationdes;
  var sql =
    'INSERT INTO electriccomplaints (mailid,date,updateddate,complaint,location,status,description,locationdes,count) VALUES(?,now(),now(),?,?,"launched",?,?,0)';
  db.query(
    sql,
    [email, service, loc, sdes, locdes],
    function (err, data, fields) {
      if (err) throw err;
      var sql1 = "SELECT name from locations";
      db.query(sql1, function (err1, data1) {
        if (err1) throw err1;
        res.render("User/electric_launch", {
          alertMsg: "Submitted Successfully!",
          username: req.session.uname,
          location: data1,
          alertclass: "alert alert-success",
          divdisable: "hidden",
        });
      });
    }
  );
});
router.post("/plumbingnewrequest", encoder, redirectLogin, function (req, res) {
  var email = req.session.emailid;
  var service = req.body.Service;
  var sdes = req.body.Servicedes;
  var loc = req.body.Location;
  var locdes = req.body.Locationdes;
  var sql =
    'INSERT INTO plumbingcomplaints (mailid,date,updateddate,complaint,location,status,description,locationdes,count) VALUES(?,now(),now(),?,?,"launched",?,?,0)';
  db.query(
    sql,
    [email, service, loc, sdes, locdes],
    function (err, data, fields) {
      if (err) throw err;
      var sql1 = "SELECT name from locations";
      db.query(sql1, function (err1, data1) {
        if (err1) throw err1;
        res.render("User/plumbing_launch", {
          alertMsg: "Submitted Successfully!",
          username: req.session.uname,
          location: data1,
          alertclass: "alert alert-success",
          divdisable: "hidden",
        });
      });
    }
  );
});

router.post("/civilnewrequest", encoder, redirectLogin, function (req, res) {
  var email = req.session.emailid;
  var service = req.body.Service;
  var sdes = req.body.Servicedes;
  var loc = req.body.Location;
  var locdes = req.body.Locationdes;
  var sql =
    'INSERT INTO civilcomplaints (mailid,date,updateddate,complaint,location,status,description,locationdes,count) VALUES(?,now(),now(),?,?,"launched",?,?,0)';
  db.query(
    sql,
    [email, service, loc, sdes, locdes],
    function (err, data, fields) {
      if (err) throw err;
      var sql1 = "SELECT name from civillocations";
      db.query(sql1, function (err1, data1) {
        if (err1) throw err1;
        res.render("User/civil_launch", {
          alertMsg: "Submitted Successfully!",
          username: req.session.uname,
          location: data1,
          alertclass: "alert alert-success",
          divdisable: "hidden",
        });
      });
    }
  );
});

router.post("/close_electric", encoder, function (req, res) {
  var cid = req.body.complaintid;
  var email = req.session.emailid;
  var sql =
    "UPDATE electriccomplaints SET status='completed' WHERE mailid=? AND cid=? AND status='closed'";
  db.query(sql, [email, cid], function (err, data) {
    res.redirect("/user/electricstatus");
  });
});

router.post("/close_plumbing", encoder, function (req, res) {
  var cid = req.body.complaintid;
  var email = req.session.emailid;
  var sql =
    "UPDATE plumbingcomplaints SET status='completed' WHERE mailid=? AND cid=? AND status='closed'";
  db.query(sql, [email, cid], function (err, data) {
    res.redirect("/user/plumbingstatus");
  });
});

router.post("/close_civil", encoder, function (req, res) {
  var cid = req.body.complaintid;
  var email = req.session.emailid;
  var sql =
    "UPDATE civilcomplaints SET status='completed' WHERE mailid=? AND cid=? AND status='closed'";
  db.query(sql, [email, cid], function (err, data) {
    res.redirect("/user/civilstatus");
  });
});

router.post("/request_electric", encoder, function (req, res) {
  var cid = req.body.complaintid;
  var email = req.session.emailid;
  var sql =
    "UPDATE electriccomplaints SET count=count+1, status='launched',updateddate=now() WHERE mailid=? AND cid=?";
  db.query(sql, [email, cid], function (err, data) {
    res.redirect("/user/electricstatus");
  });
});

router.post("/request_plumbing", encoder, function (req, res) {
  var cid = req.body.complaintid;
  var email = req.session.emailid;
  var sql =
    "UPDATE plumbingcomplaints SET count=count+1, status='launched',updateddate=now() WHERE mailid=? AND cid=?";
  db.query(sql, [email, cid], function (err, data) {
    res.redirect("/user/plumbingstatus");
  });
});

router.post("/request_civil", encoder, function (req, res) {
  var cid = req.body.complaintid;
  var email = req.session.emailid;
  var sql =
    "UPDATE civilcomplaints SET count=count+1, status='launched',updateddate=now() WHERE mailid=? AND cid=?";
  db.query(sql, [email, cid], function (err, data) {
    res.redirect("/user/civilstatus");
  });
});

module.exports = router;
