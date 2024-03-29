require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");
require("./db");

const router = require("./routes/index");
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.json({ limit: '2MB' }));
app.use("/images", express.static(__dirname + '/public/uploads'))
app.use(express.static(__dirname + "/public/homepage"));

app.use("/api", router);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/homepage")
});

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

module.exports = app;
