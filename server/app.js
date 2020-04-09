const express = require('express');
const mongoose = require('mongoose');
const config = require('../config/config');
const bodyParser = require('body-parser');
const passport = require('passport');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

const signupRoutes = require('./routes/signup.routes');
const signinRoutes = require('./routes/signin.routes');
const sellersRoutes = require('./routes/sellers.routes');
const vkRoutes = require('./routes/vk.routes');


app.use(passport.initialize());
app.use(passport.session());

// require('../config/passport')(passport);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const {port, mongoUri} = config;

app.use(signupRoutes);
app.use(signinRoutes);
app.use(sellersRoutes);
app.use(vkRoutes);


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
