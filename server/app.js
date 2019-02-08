const fs = require('fs');
const parse = require("csv-parse");
const  express = require("express");
const routes = require('./router/router');
const cors = require('cors');

const bodyParser = require('body-parser');
const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use('/uploads/', express.static('uploads'))
app.use(routes);


const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
