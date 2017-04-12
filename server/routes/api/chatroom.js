const logger = require("../../lib/logger");
const express = require("express");
const MessageStore = require("../../stores/message");
const router = express.Router();

router.get("/:chatroomId/messages", function (req, res) {
    const {chatroomId} = req.params;
    MessageStore.findMessage({
        chatroomId
    })
    .then((messages) => {
        res.status(200).json(messages);
        res.end();
    })
    .catch((error) => {
        logger.error("error sending message ", error);
        // 204 no content
        res.status(204).write({
            message: "no message found",
        });
        res.end();
    });
});
// router.post("/:chatroomId/messages", function (req, res) {
//     const {content, senderId} = req.body;
//     MessageStore.createMessage({
//         senderId: senderId,
//         chatroomId: req.params.chatroomId,
//         content: content,
//     })
//     .then((messages) => {
//         res.status(201);
//         res.end();
//     })
//     .catch((error) => {
//         res.status(406);// 406 bad request
//         res.end();
//     });
// });
module.exports = router;
