var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var app = express();
const oneDay = 1000 * 60 * 60 * 24;
const {
  PORT = 3000,
  NODE_ENV = "development",
  SESS_SECRET = "jfladlfkdf;ak",
  SESS_NAME = "sid",
  SESS_LIFETIME = oneDay,
} = process.env;
const IN_PROD = NODE_ENV === "production";

app.use(
  session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      path: "/",
      httpOnly: false,
      secure: IN_PROD, //false while developing true while running
    },
  })
); //Edited
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var loginRouter = require("./routes/login_route"); //edited
app.use("/", loginRouter); //edited

var userRouter = require("./routes/user_route"); //edited
app.use("/", userRouter); //edited

var electricRouter = require("./routes/electric_route"); //edited
app.use("/", electricRouter); //edited

var plumbingRouter = require("./routes/plumbing_route");
app.use("/", plumbingRouter);

var civilRouter = require("./routes/civil_route");
app.use("/", civilRouter);

var logoutRouter = require("./routes/logout_route"); //edited
app.use("/", logoutRouter); //edited

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/stylesheets",
  express.static(path.join(__dirname, "public/stylesheets"))
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/jquery",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);
app.use("/icons", express.static(path.join(__dirname, "icons-1.3.0/icons")));

app.use(
  "/datatablecss",
  express.static(path.join(__dirname, "node_modules/datatables.net-bs5/css"))
);
app.use(
  "/datatablejq",
  express.static(path.join(__dirname, "node_modules/datatables.net/js"))
);
app.use(
  "/datatablejs",
  express.static(path.join(__dirname, "node_modules/datatables.net-bs5/js"))
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//config dotenv
require("dotenv").config();
let port = process.env.port || 4400;
app.listen(port, () => {
  console.log(`Server Sarted on port No.: ${port} `);
});

module.exports = app;
