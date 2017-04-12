const mysql = require("../db/mysql");
const mysqlQuery = (query) => {
    return new Promise((resolve, reject) => {
        mysql.getConnection()
        .then((connection) => {
            connection.query(query, function(error, rows, fields) {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                resolve(rows);
            });
        })
        .catch((error) => {
            reject(error);
        });
    });
};
function getCurrent () {
    return new Promise((resolve, reject) => {
        mysql.getConnection()
        .then((connection) => {
            connection.query('SELECT * FROM latest_stock_info LIMIT 30', function(error, rows, fields) {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                resolve(rows);
            });
        })
        .catch((error) => {
            reject(error);
        });
    });
}

function getCurrentStockPrice (stockNumber) {
    return mysqlQuery('SELECT * FROM latest_stock_info where number="' + stockNumber + '"');
}

function getHistory (stock, from, to) {
    return new Promise((resolve, reject) => {
        mysql.getConnection()
        .then((connection) => {
            connection.query('SELECT * FROM stock_history WHERE number = "' + stock + '" OR name="' + stock + '" ORDER BY record_time ASC',
            function(error, rows, fields) {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                resolve(rows);
            });
        })
        .catch((error) => {
            reject(error);
        });
    });
}

module.exports = {
    getCurrent,
    getCurrentStockPrice,
    getHistory,
};
