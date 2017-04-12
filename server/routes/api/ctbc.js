const logger = require("../../lib/logger");
const express = require("express");
const router = express.Router();
const fetch = require("isomorphic-fetch");
const MessageStore = require("../../stores/message");
import { emit } from "../../sockets/chat";
import * as fetchUtils from "../../../shared/lib/fetch-utils"

router.post("/eSTKList", function (req, res) {
    const { StockID } = req.body;
    fetch("http://52.69.27.105:8080/hackathon/eSTKList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            StockID: StockID
        }),
    })
    .then(fetchUtils.checkStatus)
    .then(fetchUtils.parseJSON)
    .then((json) => {
        res.json(json);
    })
    .catch((error) => {
        logger.error("error when fetch json", error);
        res.writeHead(400);
        res.write(JSON.stringify(error));
        res.end();
    });
});

router.post("/eOrder", function (req, res) {
    fetch("http://52.69.27.105:8080/hackathon/eOrder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
    })
    .then(fetchUtils.checkStatus)
    .then(fetchUtils.parseJSON)
    .then((json) => {
        res.json(json);
    })
    .then(() => {
        return MessageStore.createMessage({
            senderId: "finChatHousekeeper",
            senderDisplayName: "FinChat 管家",
            senderPhoto: "/images/fin_chat_housekeeper.png",
            threadId: req.body.threadId,
            content: "委託下單完成",
            type: "placed-order",
        });
    })
    .then((message) => {
        emit("message", message);
        setTimeout(() => {
            const { StockID, StockName, Quantity, Price } = req.body;
            MessageStore.createMessage({
                senderId: "finChatHousekeeper",
                senderDisplayName: "FinChat 管家",
                senderPhoto: "/images/fin_chat_housekeeper.png",
                threadId: req.body.threadId,
                content: `${StockID} ${StockName}，成交價格：${Price}，成交張數${Quantity}`,
                type: "transacted-order",
            })
            .then((message) => {
                emit("message", message);
            });
        }, 5000);
    })
    .catch((error) => {
        logger.error("error when fetch json", error);
        res.writeHead(400);
        res.write(JSON.stringify(error));
        res.end();
    });
});

module.exports = router;
