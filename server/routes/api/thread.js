const logger = require("../../lib/logger");
const express = require("express");
const MessageStore = require("../../stores/message");
const ThreadStore = require("../../stores/thread");
const router = express.Router();

router.get("/:threadId", function (req, res) {
    const {threadId} = req.params;
    ThreadStore.findOneThread(threadId)
    .then((thread) => {
        res.status(200).json(thread);
        res.end();
    })
    .catch((error) => {
        logger.error("error find one thread ", error);
        // 204 no content
        res.status(204).write({
            message: "no thread found",
        });
        res.end();
    });
});
router.get("/:threadId/messages", function (req, res) {
    const {threadId} = req.params;
    MessageStore.findMessage({
        threadId
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

router.post("/:threadId/pin", function (req, res) {
    const {threadId} = req.params;
    const pinnedThread = req.body;
    ThreadStore.updateThread(pinnedThread)
    .then((thread) => {
        res.status(200).json(thread);
        res.end();
    })
    .catch((error) => {
        logger.error("error update thread ", error);
        // 304 not modified
        res.status(304).write({
            message: "fail update thread",
        });
        res.end();
    });
});

module.exports = router;
