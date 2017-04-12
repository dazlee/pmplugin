import React from "react";
import { renderToString } from "react-dom/server";
import webshot from "webshot";
import request from "request";

import { getStockHistory } from "../stores/stock";
import StockModule from "./stock.jsx";
import uuidV4 from "uuid/v4";

const exporter = require('highcharts-export-server');
const fs = require("fs");

const exportOptions = {
	title: {
		text: "",
	},
	rangeSelector: {
		selected: 1
	},
	chart: {
		width: 500,
		height: 300,
	},
	yAxis: {
		title: {
			text: "股價",
		}
	},
	xAxis: {
		type: 'datetime',
		title: "日期"
	}
};

function sendImage (filePath) {
	return new Promise((resolve, reject) => {
		fs.createReadStream(filePath).pipe(request.put('https://startertech-line-integration.herokuapp.com/image').on('response', function(res) {
			let data = Buffer.from([]);
			res.on("data", function (chunk) {
				data += chunk;
			});
			res.on("end", function () {
				const url = data.toString();
				resolve(url);
			});
			res.on("error", function () {
				reject();
			});
		}));
	});
}

function getScreenshotUrl (message, callback) {
	return new Promise((resolve, reject) => {
		let promise, product;
		switch (message.type) {
			case "fund-module":
				product = message.content;
				// [TODO] should change to getFundHistory
				promise = getStockHistory(product.number);
				break;
			case "stock-module":
				product = message.content;
				promise = getStockHistory(product.number);
				break;
			default:
		}
		if (promise) {
			promise.then((data) => {
				const series = {
					name: product.name,
					data
				};
				// http://www.highcharts.com/docs/export-module/setting-up-the-server
				// https://github.com/highcharts/node-export-server
				const filename = uuidV4();
				const _exportOptions = Object.assign({}, exportOptions, {
					title: {
						text: product.name,
					},
					series: [series]
				});
				const _exportSettings = {
					type: "jpeg",
					constr: "Stock",
					options: _exportOptions
				};
				exporter.initPool();
				exporter.export(_exportSettings, function (err, res) {
					fs.writeFile(`./public/tmp/charts/${filename}.jpeg`, res.data, 'base64', (error) => {
						if (error) {
							reject(error);
						}
						sendImage(`./public/tmp/charts/${filename}.jpeg`)
						.then(resolve);
					});
					exporter.killPool();
				});
			});
		} else {
			resolve();
		}
	});
}

module.exports = {
	getScreenshotUrl
};
