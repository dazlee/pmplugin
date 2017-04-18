const express = require("express");
const app = express();
const path = require("path");
const connectionLogger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const cons = require('consolidate');
const session = require('express-session');
const flash = require("connect-flash");
const serverLogger = require("./lib/logger");

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(connectionLogger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(require('stylus').middleware( {
	src: path.join(__dirname, '../client'),
	dest: path.join(__dirname, '../public'),
	compress: true,
}));
app.use(express.static(path.join(__dirname, '../public')));

// connect to mongoDB
const mongoose = require('mongoose');
let serverConfig = require("./config")[global.MODE];
mongoose.Promise = global.Promise;
mongoose.connect(serverConfig.mongoURL, (error) => {
    if (error) {
        serverLogger.error("please make sure mongodb is running", serverConfig.mongoURL);
        return;
    }

    serverLogger.info("connected to mongoDB", serverConfig.mongoURL);
});


app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));

// api
app.use("/plugin", require("./routes/plugin"));
app.use("/api/plugin", require("./routes/api/plugin"));

app.use(/^((?!\/api).)*$/, require("./middlewares/checkLogin"));
app.use("/", require("./routes/app"));
app.use("/admin/plugin", require("./routes/plugin-editing"));

// catch 404 and handle it
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers
// development envrionment only
if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err,
        });
    });
}

// production handler, no stack trace leak to users
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {},
    });
});

module.exports = app;
