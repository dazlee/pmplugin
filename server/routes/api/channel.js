const logger = require("../../lib/logger");
const express = require("express");
const router = express.Router();
const UserStore = require("../../stores/user");
const ChatroomStore = require("../../stores/chatroom");
const ChannelStore = require("../../stores/channel");

router.get("/", (req, res) => {
    ChannelStore.findChannels()
    .then((channels) => {
        res.json(channels);
    })
    .catch((error) => {
        logger.error("error find channel ", error);
        res.status(400);
        res.end();
    });
});
router.post("/", (req, res) => {
    const {name, ownerUsername, type} = req.body;
    if (!name || !ownerUsername || !type) {
        res.writeHead(400, {
            "Content-Type": "application/json",
        });
        res.write(JSON.stringify({
            message: "missing arguments",
        }));
        res.end();
        return;
    }

    UserStore.checkUserExist({
        username: ownerUsername
    })
    .then(() => {
        return ChatroomStore.createChatroom();
    })
    .then((chatroom) => {
        const attributes = {
            name: name,
            ownerUsername: ownerUsername,
            type: type,
            chatroomId: chatroom._id,
        };
        return ChannelStore.createChannel(attributes);
    })
    .then((channel) => {
        res.json(channel);
    })
    .catch((error) => {
        logger.error("error create channel ", error);
        res.status(405);// 405 method not allowed
        res.end();
    });
});

module.exports = router;
