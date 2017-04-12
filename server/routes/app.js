const logger = require("../lib/logger");
const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    return res.render("app");
});

module.exports = router;
