const express = require("express");
const { ObjectId } = require('mongoose').Types;

const logger = require("../../lib/logger");
const UserStore = require("../../stores/user");
const MessageStore = require("../../stores/message");
const FundPromotionStore = require("../../stores/fund-promotion");
const chatSocket = require("../../sockets/chat");
const { createUserWithRandomUsername } = require("../../stores/user");
const { getThreadId } = require("../../../shared/lib/thread");
const getService = require("../../services");

const router = express.Router();

function getAgent(userId) {
	return UserStore.getUser({
		_id: new ObjectId(userId),
	})
	.catch(function (error) {
		logger.info(error);
	});
}
function getClient(provider, client) {
	return UserStore.getUser({
		providers: {
			$elemMatch: provider
		},
	})
	.catch(function (error) {
		logger.info(error);
		if (error.reason === "user_not_found") {
			// should create user
			logger.error("user_not_found", "should create user");
			if (provider.id) {
				return createClient(provider, client);
			}
		}
	});
}
function createClient(provider, client) {
	const attributes = {
		displayName: client.displayName,
		photos: client.pictureUrl,
		role: "client",
		providers: [provider]
	};
	return createUserWithRandomUsername(attributes);
}

function createMessage(agent, client, provider, rawMessage) {
	const message = {
		senderId: client._id,
		senderDisplayName: client.displayName,
		senderPhoto: client.photos,
		threadId: getThreadId("support", agent, client, provider),
		provider: provider,
		content: rawMessage.text,
		type: rawMessage.type,
	};
	return MessageStore.createMessage(message);
}

router.post("/line/message", (req, res) => {
	const { events, agentUserId } = req.body;
    events.forEach((event) => {
		const rawClient = event.client;
        const provider = {
			from: "line",
			name: "Line",
			id: event.source.userId
		};
		let message;
		Promise.all([getAgent(agentUserId), getClient(provider, rawClient)])
		.then(([agent, client, ...rest]) => {
			return createMessage(agent, client, provider, event.message);
        })
        .then((_message) => {
			message = _message;

            chatSocket.emit("message", _message);
            res.status(200);
            res.end();
        })
		.then(() => {
			// post process
			const service = getService("chat");
			if (service) {
				return service.postProcess(message);
			}
		})
		.then(() => {
			// update data after post process
			const attributes = {
				userId: message.senderId
			};
			FundPromotionStore.getFundPromotion(attributes)
			.then((doc) => {
				chatSocket.emit("fundPromotion", doc);
			});
		})
        .catch((error) => {
            logger.error("error when saving message, error: ", error);
            res.status(404);
            res.end();
        });
    });
});

router.post("/fb/message", (req, res) => {
    const messageObject = req.body;
	let client, agent, message;

	messageObject.from = "facebook";
	getService("social").preProcess(messageObject)
	.then((_message) => {
		return MessageStore.createMessage(_message);
	})
	.then((_message) => {
		message = _message;
		chatSocket.emit("message", _message);
		res.status(200);
		res.end();
	})
	.then(() => {
		// post process
		const service = getService("chat");
		if (service) {
			return service.postProcess(message);
		}
	})
	.then(() => {
		// update data after post process
		const attributes = {
			userId: message.senderId
		};
		FundPromotionStore.getFundPromotion(attributes)
		.then((doc) => {
			chatSocket.emit("fundPromotion", doc);
		});
	})
	.catch((error) => {
		logger.error("error when saving message, error: ", error);
		res.status(404);
		res.end();
	});
});

module.exports = router;
