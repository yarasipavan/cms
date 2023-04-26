var express = require("express");
var db = require("../database");
var router = express.Router();
var bodyparser = require("body-parser");
const { redirect } = require("express/lib/response");
const { route } = require("express/lib/application");
var encoder = bodyparser.urlencoded();

//login verify middleware
const redirectLogin = (req, res, next) => {
  if (!req.session.emailAddress && !req.session.loggedinAuth) {
    res.redirect("/");
  } else {
    next();
  }
};

//homepage
router.get("/civil", redirectLogin, function (req, res, next) {
  //session=req.session;
  var name = req.session.name;
  res.render("Civil/civil_home", {
    username: name,
  });
});

// reset page
router.get("/civil/reset", redirectLogin, function (req, res) {
  var name = req.session.name;
  res.render("civil/reset_civil", {
    username: name,
  });
});

//add plumber page
router.get("/civil/addworker", redirectLogin, function (req, res) {
  var name = req.session.name;
  res.render("civil/worker_add", {
    username: name,
  });
});

//remove worker page
router.get("/civil/removeworker", redirectLogin, function (req, res) {
  var name = req.session.name;
  res.render("Civil/worker_remove", {
    username: name,
  });
});

//workers list
router.get("/civil/workerlist", redirectLogin, function (req, res) {
  var name = req.session.name;
  var sql = 'SELECT * FROM civilworkers where cstatus="active"';
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("Civil/worker_list", { username: name, userData: data });
  });
});

//add location form
router.get("/civil/addlocation", redirectLogin, function (req, res) {
  var name = req.session.name;
  res.render("Civil/location_add", {
    username: name,
  });
});

//remove location form
router.get("/civil/removelocation", redirectLogin, function (req, res) {
  var name = req.session.name;
  res.render("Civil/location_remove", {
    username: name,
  });
});

//location list page
router.get("/civil/locationlist", redirectLogin, function (req, res) {
  var name = req.session.name;
  var sql = "SELECT * FROM civillocations";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("Civil/location_list", { username: name, userData: data });
  });
});

//duty assignment page
router.get("/civil/dutyassignment", redirectLogin, function (req, res) {
  var name = req.session.name;
  var sql1 =
    'select id,name from civilworkers where cstatus="active" and civilworkers.id in(select id from civilworkers union select wid from civildutyassignment)';
  var n;
  db.query(sql1, function (err, data) {
    if (err) throw err;
    n = data;
  });

  var sql2 = "SELECT * FROM civillocations";
  var n1;
  db.query(sql2, function (err, data) {
    if (err) throw err;
    n1 = data;
  });

  var sql =
    "SELECT civildutyassignment.lname,civildutyassignment.wid,civilworkers.name AS wname FROM civildutyassignment JOIN civilworkers ON civildutyassignment.wid=civilworkers.id";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("Civil/duty_assignment", {
      username: name,
      userData: data,
      workers: n,
      location: n1,
    });
  });
});

//latest complaints/request page
router.get("/civil/latest", redirectLogin, function (req, res) {
  var name = req.session.name;

  var sql =
    "SELECT cid,mailid,complaint,location,description,locationdes,workerid,userlogin.name as user, civilworkers.name as ele from civilcomplaints left join userlogin on userlogin.emailid=civilcomplaints.mailid left join civilworkers on workerid=id where status='launched'";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    var sql1 =
      "SELECT * from civilcomplaints where status='launched' and workerid is null";
    db.query(sql1, function (err1, data1, fields1) {
      if (err1) throw err1;
      if (data1.length == 0) {
        res.render("Civil/civil_latest", {
          username: name,
          data: data,
          dis: "",
        });
      } else {
        res.render("Civil/civil_latest", {
          username: name,
          data: data,
          dis: "disabled",
        });
      }
    });
  });
});

//inprogress page
router.get("/civil/inprogress", redirectLogin, function (req, res) {
  var name = req.session.name;
  var eledata;
  var items;
  var sql = "SELECT * from civilcomplaints where status='inprogress'";
  var sql1 = "SELECT * from civilworkers";
  var sql2 = "select * from civilinventory where quantity>0";

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
    console.log(data, eledata, items);
    res.render("Civil/civil_inprogress", {
      username: name,
      data: data,
      elename: eledata,
      items: items,
    });
  });
});

//pending page
router.get("/civil/pending", redirectLogin, function (req, res) {
  var name = req.session.name;
  var eledata;
  var sql = "SELECT * from civilcomplaints where status='pending'";
  var sql1 = "SELECT * from civilworkers";

  db.query(sql1, function (err1, data1, fields) {
    if (err1) throw err1;
    eledata = data1;
  });
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    //console.log(eledata);
    res.render("Civil/civil_pending", {
      username: name,
      data: data,
      elename: eledata,
    });
  });
});

//closed request page

router.get("/civil/closed", redirectLogin, function (req, res) {
  var name = req.session.name;
  var eledata;
  var sql = "SELECT * from civilcomplaints where status='closed'";
  var sql1 = "SELECT * from civilworkers";

  db.query(sql1, function (err1, data1, fields) {
    if (err1) throw err1;
    eledata = data1;
  });
  db.query(sql, function (err, data, fields) {
    if (err) throw err;

    res.render("Civil/civil_closed", {
      username: name,
      data: data,
      elename: eledata,
    });
  });
});

//get closed requests
router.get("/civil/get_closed", function (request, response, next) {
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
  var sql =
    "SELECT COUNT(*) AS Total FROM civilcomplaints WHERE status='closed'";
  db.query(sql, function (error, data) {
    var total_records = data[0].Total;
    //Total number of records with filtering
    db.query(
      `SELECT COUNT(*) AS Total FROM civilcomplaints left join civilworkers on civilcomplaints.workerid=civilworkers.id WHERE status='closed' ${search_query}`,
      function (error, data) {
        var total_records_with_filter = data[0].Total;
        var query = `
            SELECT * FROM civilcomplaints left join civilworkers on civilcomplaints.workerid=civilworkers.id
            WHERE status='closed' ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;

        var data_arr = [];

        db.query(query, function (err, data) {
          if (err) throw err;
          var c = 0;
          data.forEach(function (row) {
            c++;
            data_arr.push({
              row_number: c,
              cid: row.cid,
              date: row.date,
              mailid: row.mailId,
              complaint: `<b>${row.complaint}</b><br>${row.description}`,
              location: `<b>${row.location}</b><br>${row.locationdes}`,
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

//completed request page
router.get("/civil/completed", redirectLogin, function (req, res) {
  var name = req.session.name;
  res.render("Civil/civil_completed", { username: name });
});

//get completed request details
router.get("/civil/get_completed", function (request, response, next) {
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
  var sql =
    "SELECT COUNT(*) AS Total FROM civilcomplaints WHERE status='completed'";
  db.query(sql, function (error, data) {
    var total_records = data[0].Total;
    //Total number of records with filtering
    db.query(
      `SELECT COUNT(*) AS Total FROM civilcomplaints left join civilworkers on civilcomplaints.workerid=civilworkers.id WHERE status='completed' ${search_query}`,
      function (error, data) {
        var total_records_with_filter = data[0].Total;
        var query = `
            SELECT * FROM civilcomplaints left join civilworkers on civilcomplaints.workerid=civilworkers.id
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
              mailid: row.mailId,
              complaint: `<b>${row.complaint}</b><br>${row.description}`,
              location: `<b>${row.location}</b><br>${row.locationdes}`,
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

//add inventory page
router.get("/civil/addinventory", redirectLogin, function (req, res) {
  res.render("Civil/addinventory", { username: req.session.name });
});

//update inventory page
router.get("/civil/updateinventory", redirectLogin, function (req, res) {
  var sql = "SELECT * from civilinventory";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("Civil/updateinventory", {
      username: req.session.name,
      inventory: data,
    });
  });
});

//view inventory
router.get("/civil/checkinventory", redirectLogin, function (req, res) {
  res.render("civil/view_inventory", { username: req.session.name });
});

//getinventory
router.get("/civil/getinventory", function (request, response, next) {
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
  var sql = "SELECT COUNT(*) AS Total FROM civilinventory";
  db.query(sql, function (error, data) {
    var total_records = data[0].Total;
    //Total number of records with filtering
    db.query(
      `SELECT COUNT(*) AS Total FROM civilinventory where itemid ${search_query}`,
      function (error, data) {
        var total_records_with_filter = data[0].Total;
        var query = `
            SELECT * FROM civilinventory where itemid ${search_query} 
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

//reset password post method
router.post("/civil/reset", encoder, function (req, res) {
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
        res.render("Civil/reset_civil", {
          alertMsg: "Current Password is Wrong",
          username: name,
          alertclass: "alert alert-danger",
        });
      } else {
        res.render("Civil/reset_civil", {
          alertMsg: "Updated Successfully!",
          username: name,
          alertclass: "alert alert-success",
        });
      }
    }
  );
});
//

//add worker / supervisor
router.post("/civil/addworker", encoder, redirectLogin, function (req, res) {
  var Name = req.body.name.trim();
  var name = req.session.name;

  var sql = "INSERT INTO civilworkers(name,cstatus) VALUES(?,?)";
  db.query(sql, [Name, "active"], function (err1, result1, fields1) {
    if (err1) throw err1;
    if (result1.affectedRows > 0) {
      res.render("Civil/worker_add", {
        alertMsg: "Added Successfully!",
        username: name,
        alertclass: "alert alert-success",
      });
    } else {
      res.render("Civil/worker_add", {
        alertMsg: "Worker is not Added",
        username: name,
        alertclass: "alert alert-danger",
      });
    }
  });
});

// remove worker or supervisor
router.post("/civil/removeworker", encoder, redirectLogin, function (req, res) {
  var id = req.body.wid.trim();
  id = Number(id);
  var name = req.session.name;
  var sql = "UPDATE civilworkers SET cstatus=? WHERE id=? and cstatus='active'";
  db.query(sql, ["inactive", id], function (err, data) {
    if (err) throw err;
    if (data.affectedRows == 0) {
      res.render("Civil/worker_remove", {
        alertMsg: "Worker Id is Wrong!",
        username: name,
        alertclass: "alert alert-danger",
      });
    }
    if (data.affectedRows > 0) {
      res.render("Civil/worker_remove", {
        alertMsg: "Removed Successfully!",
        username: name,
        alertclass: "alert alert-success",
      });
    } else {
      res.render("Civil/worker_remove", {
        alertMsg: "Not Removed!",
        username: name,
        alertclass: "alert alert-danger",
      });
    }
  });
});

//add location
router.post("/civil/addlocation", encoder, redirectLogin, function (req, res) {
  var lname = req.body.lname.trim();
  var ldes = req.body.ldes.trim();
  var name = req.session.name;
  var sqlid = "SELECT * FROM civillocations WHERE name=?";
  db.query(sqlid, [lname], function (err, result, fields) {
    if (err) throw err;
    if (result.length >= 1) {
      res.render("Civil/location_add", {
        alertMsg: "Location Already Exits!",
        username: name,
        alertclass: "alert alert-danger",
      });
    }
    if (result.length == 0) {
      var sql = "INSERT INTO civillocations(name,description) VALUES(?,?)";
      var sql1 = "INSERT INTO civildutyassignment(lname) VALUES(?)";

      db.query(sql, [lname, ldes], function (err1, result1, fields1) {
        if (err1) throw err1;
        if (result1.affectedRows > 0) {
          db.query(sql1, [lname], function (err2, result2, fields2) {
            if (err2) throw err2;
          });
          res.render("Civil/location_add", {
            alertMsg: "Location Added Successfully!",
            username: name,
            alertclass: "alert alert-success",
          });
        } else {
          res.render("Civil/location_add", {
            alertMsg: "Location is not Added",
            username: name,
            alertclass: "alert alert-danger",
          });
        }
      });
    }
  });
});

//remove location
router.post(
  "/civil/removelocation",
  encoder,
  redirectLogin,
  function (req, res) {
    var lname = req.body.lname.trim();
    var name = req.session.name;
    var sql = "DELETE from civillocations WHERE name=?";
    db.query(sql, [lname], function (err, data) {
      if (err) throw err;
      if (data.affectedRows == 0) {
        res.render("Civil/location_remove", {
          alertMsg: "Location is not exits!",
          username: name,
          alertclass: "alert alert-danger",
        });
      }
      if (data.affectedRows > 0) {
        res.render("Civil/location_remove", {
          alertMsg: "Removed Successfully!",
          username: name,
          alertclass: "alert alert-success",
        });
      } else {
        res.render("Civil/location_remove", {
          alertMsg: "Not Removed!",
          username: name,
          alertclass: "alert alert-danger",
        });
      }
    });
  }
);

//update duty assignment
router.post("/civil/updateduty", encoder, redirectLogin, function (req, res) {
  var x = req.body;
  var a = x.Location;
  var b = x.seldata;

  var i = 0;
  var count = 0;
  for (var i = 0; i < a.length; i++) {
    var sql1 = "UPDATE civildutyassignment SET wid=? WHERE lname=?";
    db.query(sql1, [b[i], a[i]], function (err, results) {
      if (err) throw err;
    });
  }
  res.redirect("/civil/dutyassignment");
});

//assign requests
router.post("/civil/assign", redirectLogin, function (req, res) {
  var sql =
    "UPDATE civilcomplaints SET workerid=(select wid from civildutyassignment where civilcomplaints.location=civildutyassignment.lname) where cid";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
  });
  res.redirect("/civil/latest");
});

//mark as in-progress
router.post("/civil/latesttoinprogress", function (req, res) {
  var sql =
    "UPDATE civilcomplaints SET status='inprogress' WHERE status='launched' and cid";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
  });
  res.redirect("/civil/latest");
});

//move to pending
router.post("/civil/mvpending", encoder, redirectLogin, function (req, res) {
  var cid = req.body.cid;
  var sql = "UPDATE civilcomplaints SET status='pending' WHERE cid=?";
  db.query(sql, cid, function (err, data, fields) {
    if (err) throw err;
  });
  res.redirect("/civil/inprogress");
});

// router.post("/civil/close", encoder, redirectLogin, function (req, res) {
//   var cid = req.body.cid;
//   var sql = "UPDATE civilcomplaints SET status='closed' WHERE cid=?";
//   db.query(sql, cid, function (err, data, fields) {
//     if (err) throw err;
//   });
//   res.redirect("/civil/inprogress");
// });

router.post("/closeall", encoder, redirectLogin, function (req, res) {
  var sql =
    "UPDATE electriccomplaints SET status='closed' WHERE status='inprogress' and cid";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
  });
  res.redirect("/electric/inprogress");
});

//pending to in -progress
router.post("/civil/inprogress", encoder, redirectLogin, function (req, res) {
  var cid = req.body.cid;
  var sql = "UPDATE civilcomplaints SET status='inprogress' WHERE cid=?";
  db.query(sql, cid, function (err, data, fields) {
    if (err) throw err;
  });
  res.redirect("/civil/pending");
});

//move all request from pending to in-progress
router.post("/civil/moveall", encoder, redirectLogin, function (req, res) {
  var sql =
    "UPDATE civilcomplaints SET status='inprogress' WHERE status='pending' and cid";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
  });
  res.redirect("/civil/pending");
});

//add inventory
router.post("/civil/addinventory", encoder, function (req, res) {
  var name = req.body.itemname;
  var des = req.body.itemdes;
  var q = req.body.itemquantity;
  var values = [];
  for (var i = 0; i < name.length; i++) {
    var d1 = [name[i], des[i], q[i]];
    values.push(d1);
  }
  var query =
    "INSERT INTO civilinventory(itemname, itemdescription, quantity) VALUES ?";

  db.query(query, [values], function (err, data, fields) {
    if (err) throw err;
    else
      res.render("Civil/addinventory", {
        username: req.session.name,
        alertMsg: "Added Successfully",
        alertclass: "alert alert-success",
      });
  });
});

//update inventory
router.post("/civil/updateinventory", encoder, function (req, res) {
  var name = req.body.itemid;
  var q = req.body.itemquantity;
  console.log(name, q);
  var values = [];
  for (var i = 0; i < name.length; i++) {
    var d1 = [name[i], q[i]];
    values.push(d1);
  }
  var query = "UPDATE civilinventory SET quantity=quantity+? WHERE itemid=?";
  for (var i = 0; i < name.length; i++) {
    db.query(query, [q[i], name[i]], function (err, data, fields) {
      if (err) throw err;
    });
  }

  var sql = "SELECT * from civilinventory";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("civil/updateinventory", {
      username: req.session.name,
      inventory: data,
      alertMsg: "Successfully Updated",
      alertclass: "alert alert-success",
    });
  });
});

// while closing update the inventory
router.post("/civil/inventoryused", encoder, function (req, res) {
  var itemid = req.body.itemid;
  var quantity = req.body.quantity;
  var cid = req.body.cid;
  var values = [];
  if (itemid.length == 1 && itemid[0] === "none") {
    // when problem solve only with manpower without using any items
    db.query(
      "UPDATE civilcomplaints SET status='closed' WHERE cid=?",
      cid,
      (err) => {
        if (err) throw err;
        else {
          db.query(
            "INSERT INTO `civiltransactions`(`cid`, `itemid`, `quantity`) VALUES (?,?,?)",
            [cid, "None", null],
            (err) => {
              if (err) throw err;
              res.redirect("/civil/inprogress");
            }
          );
        }
      }
    );
  } else {
    if (itemid.length != quantity.length) {
      res.redirect("/civil/inprogress");
    }

    // var updatequery="";
    var updatequery1 = "UPDATE civilinventory SET quantity= case itemid ";

    var itemids = " else quantity end WHERE itemid IN(";
    var query =
      "SELECT itemid,quantity from civilinventory where itemid=? and quantity>=?";
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
          res.redirect("/civil/inprogress");
        }
        if (data.length < 1) {
          res.redirect("/civil/inprogress");
          return;
        }
      });
    }
    updatequery1 += itemids + ");";

    const addStudent = (values, cid, updatequery) => {
      return new Promise((resolve, reject) => {
        return db.beginTransaction((err) => {
          if (err) {
            return reject("Error occurred while creating the transaction");
          }
          return db.query(
            "UPDATE civilcomplaints SET status='closed' WHERE cid=?",
            cid,
            (err) => {
              if (err) {
                return db.rollback(() => {
                  return reject("Status Updation is Failed", err);
                });
              }
              return db.query(
                "INSERT INTO civiltransactions VALUES ?",
                [values],
                (err) => {
                  if (err) {
                    return db.rollback(() => {
                      return reject("Inserting to civil Transactions Table");
                    });
                  }
                  return db.query(updatequery, (err) => {
                    if (err) {
                      return db.rollback(() => {
                        console.log(err);
                        return reject("Updating civil Inventory Failed");
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
    res.redirect("/civil/inprogress");
  }
});

module.exports = router;
