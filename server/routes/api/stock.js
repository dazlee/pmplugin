const logger = require("../../lib/logger");
const express = require("express");
const router = express.Router();
const StockStore = require("../../stores/stock");

router.get("/", (req, res) => {
    StockStore.getCurrentStock()
    .then((rows) => {
        res.json(rows);
    })
    .catch((error) => {
        logger.error("error when getting stock info", error);
        res.writeHead(400, {
            "Content-Type": "application/json",
        });
        res.write(JSON.stringify({
            message: "bad request",
        }));
        res.end();
    });
});

router.get("/:stockNumber/current", (req, res) => {
    const { stockNumber } = req.params;
    StockStore.getCurrentStockPrice(stockNumber)
    .then((rows) => {
        if (rows && rows.length > 0) {
            res.json(rows[0]);
        } else {
            throw new Error("cannot find stock");
        }
    })
    .catch((error) => {
        logger.error("error when getting stock info", error);
        res.writeHead(400, {
            "Content-Type": "application/json",
        });
        res.write(JSON.stringify({
            message: "bad request",
        }));
        res.end();
    });
});

router.get("/:stockNumber", (req, res) => {
    const {stockNumber} = req.params;
    StockStore.getStockHistory(stockNumber)
    .then((rows) => {
        res.json(rows);
    })
    .catch((error) => {
        logger.error("error when getting stock info", error);
        res.writeHead(400, {
            "Content-Type": "application/json",
        });
        res.write(JSON.stringify({
            message: "bad request",
        }));
        res.end();
    });
});

module.exports = router;
