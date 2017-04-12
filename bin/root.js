const config = require("../server/config");
const { hostname, port } = config[config.mode];

global.MODE = config.mode;
global.HOSTNAME = hostname;
global.PORT = port;

require('babel-core/register');
require("./www.js");
