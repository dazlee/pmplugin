const express = require("express");
const router = express.Router();

const { getUsers } = require("../../stores/user");

router.get("/", (req, res) => {
	const attributes = {
		_id: {
			$in: req.user.clientUserIds
		}
	};
	getUsers(attributes)
	.then((clients) => {
		res.json(clients);
	})
	.catch((error) => {
		logger.error(error);

		res.status(404).send(error);
		res.end();
	});
});

module.exports = router;
