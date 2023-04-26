var express = require("express");
var db = require("../database");
var router = express.Router();
var bodyparser = require("body-parser");
const { redirect } = require("express/lib/response");
const { route } = require("express/lib/application");
var encoder = bodyparser.urlencoded();
const redirectLogin = (req, res, next) => {
  if (!req.session.emailAddress && !req.session.loggedinAuth) {
    res.redirect("/");
  } else {
    next();
  }
};
router.get("/plumbing", redirectLogin, function (req, res, next) {
  //session=req.session;
  var name = req.session.name;
  res.render("Plumbing/plumbing_home", {
    username: name,
  });
});
router.get("/plumbing/plumbingreset", redirectLogin, function (req, res) {
  var name = req.session.name;
  res.render("Plumbing/reset_plumbing", {
    username: name,
  });
});

router.get("/plumbing/addplumber", redirectLogin, function (req, res) {
  var name = req.session.name;
  res.render("Plumbing/plumber_add", {
    username: name,
  });
});
router.get("/plumbing/removeplumber", redirectLogin, function (req, res) {
  var name = req.session.name;
  res.render("Plumbing/plumber_remove", {
    username: name,
  });
});

router.get("/plumbing/addlocation", redirectLogin, function (req, res) {
  var name = req.session.name;
  res.render("Plumbing/location_add", {
    username: name,
  });
});
router.get("/plumbing/removelocation", redirectLogin, function (req, res) {
  var name = req.session.name;
  res.render("Plumbing/location_remove", {
    username: name,
  });
});
router.get("/plumbing/plumberlist", redirectLogin, function (req, res) {
  var name = req.session.name;
  var sql = 'SELECT * FROM plumbers where pstatus="active"';
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("Plumbing/plumber_list", { username: name, userData: data });
  });
});
router.get("/plumbing/locationlist", redirectLogin, function (req, res) {
  var name = req.session.name;
  var sql = "SELECT * FROM plumbinglocations";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("Plumbing/location_list", { username: name, userData: data });
  });
});
router.get("/plumbing/dutyassignment", redirectLogin, function (req, res) {
  var name = req.session.name;
  //var sql1="SELECT distinct(id),name FROM electricians,dutyassignment where electricians.id not in(select eid from dutyassignment)";
  var sql1 =
    'select id,name from plumbers where pstatus="active" and plumbers.id in(select id from plumbers union select pid from plumbingdutyassignment)';
  var n;
  db.query(sql1, function (err, data) {
    if (err) throw err;
    n = data;
  });

  var sql2 = "SELECT * FROM plumbinglocations";
  var n1;
  db.query(sql2, function (err, data) {
    if (err) throw err;
    n1 = data;
  });
  var sql =
    "SELECT plumbingdutyassignment.lname,plumbingdutyassignment.pid,plumbers.name AS ename FROM plumbingdutyassignment JOIN plumbers ON plumbingdutyassignment.pid=plumbers.id";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("Plumbing/duty_assignment", {
      username: name,
      userData: data,
      electrician: n,
      location: n1,
    });
  });
});
router.get("/plumbing/latest", redirectLogin, function (req, res) {
  var name = req.session.name;

  var sql =
    "SELECT cid,mailid,complaint,location,description,locationdes,pid,userlogin.name as user, plumbers.name as ele from plumbingcomplaints left join userlogin on userlogin.emailid=plumbingcomplaints.mailid left join plumbers on pid=id where status='launched'";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    var sql1 =
      "SELECT * from plumbingcomplaints where status='launched' and pid is null";
    db.query(sql1, function (err1, data1, fields1) {
      if (err1) throw err1;
      if (data1.length == 0) {
        res.render("Plumbing/plumbing_latest", {
          username: name,
          data: data,
          dis: "",
        });
      } else {
        res.render("Plumbing/plumbing_latest", {
          username: name,
          data: data,
          dis: "disabled",
        });
      }
    });
  });
});
router.get("/plumbing/inprogress", redirectLogin, function (req, res) {
  var name = req.session.name;
  var eledata;
  var items;
  var sql = "SELECT * from plumbingcomplaints where status='inprogress'";
  var sql1 = "SELECT * from plumbers";
  var sql2 = "select * from plumbinginventory where quantity>0";

  db.query(sql1, function (err1, data1, fields) {
    if (err1) throw err1;
    eledata = data1;
  });
  db.query(sql2, (err2, data2, fields) => {
    if (err2) throw err2;
    items = data2;
  });
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    //console.log(eledata);
    res.render("Plumbing/plumbing_inprogress", {
      username: name,
      data: data,
      elename: eledata,
      items: items,
    });
  });
});
router.get("/plumbing/pending", redirectLogin, function (req, res) {
  var name = req.session.name;
  var eledata;
  var sql = "SELECT * from plumbingcomplaints where status='pending'";
  var sql1 = "SELECT * from plumbers";

  db.query(sql1, function (err1, data1, fields) {
    if (err1) throw err1;
    eledata = data1;
  });
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    //console.log(eledata);
    res.render("Plumbing/plumbing_pending", {
      username: name,
      data: data,
      elename: eledata,
    });
  });
});

router.get("/plumbing/closed", redirectLogin, function (req, res) {
  var name = req.session.name;
  var eledata;
  var sql = "SELECT * from plumbingcomplaints where status='closed'";
  var sql1 = "SELECT * from plumbers";

  db.query(sql1, function (err1, data1, fields) {
    if (err1) throw err1;
    eledata = data1;
  });
  db.query(sql, function (err, data, fields) {
    if (err) throw err;

    res.render("Plumbing/plumbing_closed", {
      username: name,
      data: data,
      elename: eledata,
    });
  });
});
router.get("/plumbingclosed", function (request, response, next) {
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
  var sql =
    "SELECT COUNT(*) AS Total FROM plumbingcomplaints WHERE status='closed'";
  db.query(sql, function (error, data) {
    var total_records = data[0].Total;
    //Total number of records with filtering
    db.query(
      `SELECT COUNT(*) AS Total FROM plumbingcomplaints left join plumbers on plumbingcomplaints.pid=plumbers.id WHERE status='closed' ${search_query}`,
      function (error, data) {
        var total_records_with_filter = data[0].Total;
        var query = `
            SELECT * FROM plumbingcomplaints left join plumbers on plumbingcomplaints.pid=plumbers.id
            WHERE status='closed' ${search_query} 
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
              mailid: row.mailid,
              complaint: `<b>${row.complaint}</b><br>${row.description}`,
              location: `<b>${row.location}</b><br>${row.locationdes}`,
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
router.get("/plumbing/completed", redirectLogin, function (req, res) {
  var name = req.session.name;
  res.render("Plumbing/plumbing_completed", { username: name });
});
router.get("/plumbingcompleted", function (request, response, next) {
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
  var sql =
    "SELECT COUNT(*) AS Total FROM plumbingcomplaints WHERE status='completed'";
  db.query(sql, function (error, data) {
    var total_records = data[0].Total;
    //Total number of records with filtering
    db.query(
      `SELECT COUNT(*) AS Total FROM plumbingcomplaints left join plumbers on plumbingcomplaints.pid=plumbers.id WHERE status='completed' ${search_query}`,
      function (error, data) {
        var total_records_with_filter = data[0].Total;
        var query = `
            SELECT * FROM plumbingcomplaints left join plumbers on plumbingcomplaints.pid=plumbers.id
            WHERE status='completed' ${search_query} 
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
              mailid: row.mailid,
              complaint: `<b>${row.complaint}</b><br>${row.description}`,
              location: `<b>${row.location}</b><br>${row.locationdes}`,
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
router.get("/plumbing/addinventory", redirectLogin, function (req, res) {
  res.render("Plumbing/addinventory", { username: req.session.name });
});
router.get("/plumbing/updateinventory", redirectLogin, function (req, res) {
  var sql = "SELECT * from plumbinginventory";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("Plumbing/updateinventory", {
      username: req.session.name,
      inventory: data,
    });
  });
});
router.get("/plumbing/checkinventory", redirectLogin, function (req, res) {
  res.render("Plumbing/view_inventory", { username: req.session.name });
});
router.get("/plumbingcheckinventory", function (request, response, next) {
  var draw = request.query.draw;

  var start = request.query.start;

  var length = request.query.length;

  var order_data = request.query.order;

  if (typeof order_data == "undefined") {
    var column_name = "itemid";

    var column_sort_order = "desc";
  } else {
    var column_index = request.query.order[0]["column"];

    var column_name = request.query.columns[column_index]["data"];

    var column_sort_order = request.query.order[0]["dir"];
  }

  //search data

  var search_value = request.query.search["value"];

  var search_query = `
     AND (itemid LIKE '%${search_value}%' 
      OR itemname LIKE '%${search_value}%' 
      OR itemdescription LIKE '%${search_value}%'
      OR quantity LIKE '%${search_value}%'
     )
    `;
  //Total number of records without filtering
  var sql = "SELECT COUNT(*) AS Total FROM plumbinginventory";
  db.query(sql, function (error, data) {
    var total_records = data[0].Total;
    //Total number of records with filtering
    db.query(
      `SELECT COUNT(*) AS Total FROM plumbinginventory where itemid ${search_query}`,
      function (error, data) {
        var total_records_with_filter = data[0].Total;
        var query = `
            SELECT * FROM plumbinginventory where itemid ${search_query} 
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
              itemid: row.itemid,
              itemname: row.itemname,
              itemdescription: row.itemdescription,
              quantity: row.quantity,
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
router.post("/plumbing/reset", encoder, function (req, res) {
  var current = req.body.inputPasswordOld.trim();
  var newpassword = req.body.inputPasswordNew.trim();
  var emailAddress = req.session.emailAddress;
  var name = req.session.name;
  var sql = "UPDATE authlogin SET password=? WHERE emailid=? AND password=?";
  db.query(
    sql,
    [newpassword, emailAddress, current],
    function (err, data, fields) {
      if (err) throw err;
      if (data.affectedRows == 0) {
        res.render("Electric/reset_electric", {
          alertMsg: "Current Password is Wrong",
          username: name,
          alertclass: "alert alert-danger",
        });
      } else {
        res.render("Electric/reset_electric", {
          alertMsg: "Updated Successfully!",
          username: name,
          alertclass: "alert alert-success",
        });
      }
    }
  );
});
router.post("/addplumber", encoder, redirectLogin, function (req, res) {
  var Name = req.body.name.trim();
  var name = req.session.name;
  var sqlid = "SELECT * FROM plumbers WHERE name=?";
  db.query(sqlid, [Name], function (err, result, fields) {
    if (err) throw err;
    if (result.length >= 1) {
      res.render("Plumbing/plumber_add", {
        alertMsg: "PlumberAlready Exits!",
        username: name,
        alertclass: "alert alert-danger",
      });
    }
    if (result.length == 0) {
      var sql = "INSERT INTO plumbers(name,pstatus) VALUES(?,?)";
      db.query(sql, [Name, "active"], function (err1, result1, fields1) {
        if (err1) throw err1;
        if (result1.affectedRows > 0) {
          res.render("Plumbing/plumber_add", {
            alertMsg: "Added Successfully!",
            username: name,
            alertclass: "alert alert-success",
          });
        } else {
          res.render("Plumbing/plumber_add", {
            alertMsg: "Plumber is not Added",
            username: name,
            alertclass: "alert alert-danger",
          });
        }
      });
    }
  });
});
router.post("/removeplumber", encoder, redirectLogin, function (req, res) {
  var id = req.body.pid.trim();
  id = Number(id);
  var name = req.session.name;
  var sql = "UPDATE plumbers SET pstatus=? WHERE id=?";
  db.query(sql, ["inactive", id], function (err, data) {
    if (err) throw err;
    if (data.affectedRows == 0) {
      res.render("Plumbing/plumber_remove", {
        alertMsg: "Plumber Id is Wrong!",
        username: name,
        alertclass: "alert alert-danger",
      });
    }
    if (data.affectedRows > 0) {
      res.render("Plumbing/plumber_remove", {
        alertMsg: "Removed Successfully!",
        username: name,
        alertclass: "alert alert-success",
      });
    } else {
      res.render("Plumbing/plumber_remove", {
        alertMsg: "Not Removed!",
        username: name,
        alertclass: "alert alert-danger",
      });
    }
  });
});
router.post(
  "/plumbingaddlocation",
  encoder,
  redirectLogin,
  function (req, res) {
    var lname = req.body.lname.trim();
    var ldes = req.body.ldes.trim();
    var name = req.session.name;
    var sqlid = "SELECT * FROM plumbinglocations WHERE name=?";
    db.query(sqlid, [lname], function (err, result, fields) {
      if (err) throw err;
      if (result.length >= 1) {
        res.render("Electric/location_add", {
          alertMsg: "Location Already Exits!",
          username: name,
          alertclass: "alert alert-danger",
        });
      }
      if (result.length == 0) {
        var sql = "INSERT INTO plumbinglocations(name,description) VALUES(?,?)";
        var sql1 = "INSERT INTO plumbingdutyassignment(lname) VALUES(?)";
        db.query(sql, [lname, ldes], function (err1, result1, fields1) {
          //console.log("Reached");
          if (err1) throw err1;
          if (result1.affectedRows > 0) {
            db.query(sql1, [lname], function (err2, result2, fields2) {
              if (err2) throw err2;
            });
            res.render("Plumbing/location_add", {
              alertMsg: "Location Added Successfully!",
              username: name,
              alertclass: "alert alert-success",
            });
          } else {
            res.render("Plumbing/location_add", {
              alertMsg: "Location is not Added",
              username: name,
              alertclass: "alert alert-danger",
            });
          }
        });
      }
    });
  }
);
router.post(
  "/plumbingremovelocation",
  encoder,
  redirectLogin,
  function (req, res) {
    var lname = req.body.lname.trim();
    var name = req.session.name;
    var sql = "DELETE from plumbinglocations WHERE name=?";
    db.query(sql, [lname], function (err, data) {
      if (err) throw err;
      if (data.affectedRows == 0) {
        res.render("Plumbing/location_remove", {
          alertMsg: "Location is not exits!",
          username: name,
          alertclass: "alert alert-danger",
        });
      }
      if (data.affectedRows > 0) {
        res.render("Plumbing/location_remove", {
          alertMsg: "Removed Successfully!",
          username: name,
          alertclass: "alert alert-success",
        });
      } else {
        res.render("Plumbing/location_remove", {
          alertMsg: "Not Removed!",
          username: name,
          alertclass: "alert alert-danger",
        });
      }
    });
  }
);
router.post("/plumbingupdateduty", encoder, redirectLogin, function (req, res) {
  var x = req.body;
  var a = x.Location;
  var b = x.seldata;
  console.log(a);
  console.log(a[0]);
  console.log(a[1]);
  console.log(a[2]);
  console.log(b[0]);
  var i = 0;
  var count = 0;
  for (var i = 0; i < a.length; i++) {
    var sql1 = "UPDATE plumbingdutyassignment SET pid=? WHERE lname=?";
    db.query(sql1, [b[i], a[i]], function (err, results) {
      if (err) throw err;
      console.log(a[i]);
    });
  }
  res.redirect("/plumbing/dutyassignment");

  /* var sql="TRUNCATE TABLE dutyassignment";
    db.query(sql,function(err){
        if(err) throw err;
        console.log("Deleted Successfully!");
    })
    var sql1="INSERT INTO dutyassignment(lname,eid) VALUES ?";
    db.query(sql1,[values],function(err,results){
        if(err){
            res.redirect('/electric/dutyassignment');
        }
        else if(results.affectedRows==a.length)
        {
            res.redirect('/electric/dutyassignment');
        }
    })*/
});
router.post("/plumbingassign", redirectLogin, function (req, res) {
  var sql =
    "UPDATE plumbingcomplaints SET pid=(select pid from plumbingdutyassignment where plumbingcomplaints.location=plumbingdutyassignment.lname) where cid";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
  });
  res.redirect("/plumbing/latest");
});
router.post("/plumbinglatesttoinprogress", function (req, res) {
  var sql =
    "UPDATE plumbingcomplaints SET status='inprogress' WHERE status='launched' and cid";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
  });
  res.redirect("/plumbing/latest");
});
router.post("/plumbingmvpending", encoder, redirectLogin, function (req, res) {
  var cid = req.body.cid;
  var sql = "UPDATE plumbingcomplaints SET status='pending' WHERE cid=?";
  db.query(sql, cid, function (err, data, fields) {
    if (err) throw err;
  });
  res.redirect("/plumbing/inprogress");
});

router.post("/close", encoder, redirectLogin, function (req, res) {
  var cid = req.body.cid;
  var sql = "UPDATE electriccomplaints SET status='closed' WHERE cid=?";
  db.query(sql, cid, function (err, data, fields) {
    if (err) throw err;
  });
  res.redirect("/plumbing/inprogress");
});
router.post("/closeall", encoder, redirectLogin, function (req, res) {
  var sql =
    "UPDATE electriccomplaints SET status='closed' WHERE status='inprogress' and cid";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
  });
  res.redirect("/electric/inprogress");
});
router.post("/plumbinginprogress", encoder, redirectLogin, function (req, res) {
  var cid = req.body.cid;
  var sql = "UPDATE plumbingcomplaints SET status='inprogress' WHERE cid=?";
  db.query(sql, cid, function (err, data, fields) {
    if (err) throw err;
  });
  res.redirect("/plumbing/pending");
});

router.post("/plumbingmoveall", encoder, redirectLogin, function (req, res) {
  var sql =
    "UPDATE plumbingcomplaints SET status='inprogress' WHERE status='pending' and cid";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
  });
  res.redirect("/plumbing/pending");
});
router.post("/plumbingaddinventory", encoder, function (req, res) {
  var name = req.body.itemname;
  var des = req.body.itemdes;
  var q = req.body.itemquantity;
  var values = [];
  for (var i = 0; i < name.length; i++) {
    var d1 = [name[i], des[i], q[i]];
    values.push(d1);
  }
  var query =
    "INSERT INTO plumbinginventory(itemname,itemdescription,quantity) VALUES ?";
  db.query(query, [values], function (err, data, fields) {
    if (err) throw err;
    else
      res.render("Plumbing/addinventory", {
        username: req.session.name,
        alertMsg: "Added Successfully",
        alertclass: "alert alert-success",
      });
  });
});
router.post("/plumbingupdateinventory", encoder, function (req, res) {
  var name = req.body.itemid;
  var q = req.body.itemquantity;
  var values = [];
  for (var i = 0; i < name.length; i++) {
    var d1 = [name[i], q[i]];
    values.push(d1);
  }
  var query = "UPDATE plumbinginventory SET quantity=quantity+? WHERE itemid=?";
  for (var i = 0; i < name.length; i++) {
    db.query(query, [q[i], name[i]], function (err, data, fields) {
      if (err) throw err;
    });
  }

  var sql = "SELECT * from plumbinginventory";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("Plumbing/updateinventory", {
      username: req.session.name,
      inventory: data,
      alertMsg: "Successfully Updated",
      alertclass: "alert alert-success",
    });
  });
});
router.post("/plumbinginventoryused", encoder, function (req, res) {
  var itemid = req.body.itemid;
  var quantity = req.body.quantity;
  var cid = req.body.cid;
  var values = [];
  if (itemid.length == 1 && itemid[0] === "none") {
    // when problem solve onlywith manpower without using any items
    db.query(
      "UPDATE plumbingcomplaints SET status='closed' WHERE cid=?",
      cid,
      (err) => {
        if (err) throw err;
        else {
          db.query(
            "INSERT INTO `plumbingtransactions`(`cid`, `itemid`, `quantity`) VALUES (?,?,?)",
            [cid, "None", null],
            (err) => {
              if (err) throw err;
              res.redirect("/plumbing/inprogress");
            }
          );
        }
      }
    );
    //     values.push([cid,"None",null]);
    //     const updatequery0 = (values,cid) => {
    //         return new Promise((resolve, reject) => {
    //             return db.beginTransaction(err => {
    //                 if (err) {
    //                     return reject("Error occurred while creating the transaction");
    //                 }
    //                 return db.query(
    //                     "UPDATE electriccomplaints SET status='closed' WHERE cid=?",cid, (err) => {
    //                         if (err) {
    //                             return db.rollback(() => {
    //                                 return reject("Status Updation is Failed", err)
    //                             });
    //                         }
    //                         return db.query(
    //                             'INSERT INTO electrictransactions VALUES ?', [values], (err) => {
    //                                 if (err) {
    //                                     return db.rollback(() => {
    //                                         return reject("Inserting to Electric Transactions Table");
    //                                     });
    //                                 }

    //                             })

    //                 });
    //             });
    //         });
    //     }
    //     var u=updatequery0(values,cid);
    //     u.then(()=>{
    //      console.log("Promise Resolved")
    //  }).catch((v)=>{
    //     console.log("Promise Rejected "+v)
    //  })
    // res.redirect('/electric/inprogress');
  } else {
    if (itemid.length != quantity.length) {
      res.redirect("/plumbing/inprogress");
    }

    // var updatequery="";
    var updatequery1 = "UPDATE plumbinginventory SET quantity= case itemid ";
    //    = CASE BAND_NAME
    //    WHEN 'METALLICA' THEN 90000
    //    WHEN 'BTS' THEN 200000
    //    ELSE PERFORMING_COST
    //    END
    //    WHERE BAND_NAME IN('METALLICA', 'BTS');"
    var itemids = " else quantity end WHERE itemid IN(";
    var query =
      "SELECT itemid,quantity from plumbinginventory where itemid=? and quantity>=?";
    for (var i = 0; i < itemid.length; i++) {
      values.push([cid, itemid[i], quantity[i]]);
      updatequery1 += `WHEN ${itemid[i]} THEN quantity-${quantity[i]} `;
      itemids += `'${itemid[i]}'`;
      if (i < itemid.length - 1) {
        itemids += ",";
      }
      //updatequery+=`UPDATE electricinventory SET quantity=quantity-${quantity[i]} where itemid=${itemid[i]}; `;
      db.query(query, [itemid[i], quantity[i]], function (err, data, fields) {
        if (err) {
          res.redirect("/plumbing/inprogress");
        }
        if (data.length < 1) {
          res.redirect("/plumbing/inprogress");
          return;
        }
      });
    }
    updatequery1 += itemids + ");";
    console.log(updatequery1);
    console.log(itemid);
    console.log(quantity);
    console.log(cid);
    const addStudent = (values, cid, updatequery) => {
      return new Promise((resolve, reject) => {
        return db.beginTransaction((err) => {
          if (err) {
            return reject("Error occurred while creating the transaction");
          }
          return db.query(
            "UPDATE plumbingcomplaints SET status='closed' WHERE cid=?",
            cid,
            (err) => {
              if (err) {
                return db.rollback(() => {
                  return reject("Status Updation is Failed", err);
                });
              }
              return db.query(
                "INSERT INTO plumbingtransactions VALUES ?",
                [values],
                (err) => {
                  if (err) {
                    return db.rollback(() => {
                      return reject("Inserting to Plumbing Transactions Table");
                    });
                  }
                  return db.query(updatequery, (err) => {
                    if (err) {
                      return db.rollback(() => {
                        console.log(err);
                        return reject("Updating Plumbing Inventory Failed");
                      });
                    }
                    return db.commit((err) => {
                      if (err) {
                        return db.rollback(() => {
                          return reject("Commit failed");
                        });
                      }
                    });
                  });
                }
              );
            }
          );
        });
      });
    };
    var r = addStudent(values, cid, updatequery1);
    r.then(() => {
      console.log("Promise Resolved");
    }).catch((v) => {
      console.log("Promise Rejected " + v);
    });
    res.redirect("/plumbing/inprogress");
  }
});

module.exports = router;
