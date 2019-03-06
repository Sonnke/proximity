const fs = require('fs');
const parse = require("csv-parse");
const  express = require("express");
const routes = require('./router/router');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const bodyParser = require('body-parser');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('client'));
app.use(cors());
app.use(fileUpload({
    useTempFiles:true
}));
app.use(bodyParser.json());

app.use('/uploads/', express.static('uploads'))
app.use(routes);


const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

global.io = io;

module.exports = server;
