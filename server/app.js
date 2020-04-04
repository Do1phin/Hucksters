const express = require('express');
const mongoose = require('mongoose');
const config = require('../config/config');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { port, mongoUri } = config;

app.use(routes);

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


async function startApp() {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }, () => {
            mongoose.set('debug', true);
            console.log(`MongoDB connected`)
        });
        await app.listen(port, () => {
            console.log(`Express-server started on port № ${port}`)
        });
    } catch (e) {
        throw new Error(e);
    }
}

startApp();

module.exports = app;
