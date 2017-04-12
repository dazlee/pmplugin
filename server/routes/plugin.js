const logger = require("../lib/logger");
const express = require("express");
const router = express.Router();

router.get("/:plugin", function (req, res) {
    return res.render("plugin", {
		type: req.params.plugin
	});
});

module.exports = router;
