const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserStore = require("../stores/user");

const passportConfig = {
    successFlash: "successfully log in",
    failureFlash: "incorrect username or password",
    failureRedirect: "/",
};
router.post("/", function (req, res, next) {
    passport.authenticate("local", function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.render("login", {
                message: "帳號或密碼錯誤",
            });
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect("/");
        });
    })(req, res, next);
});
router.get("/", function (req, res, next) {
    if (req.user) {
        const { role } = req.user;
        return res.redirect("/");
    }
    res.render("login");
});

module.exports = router;
