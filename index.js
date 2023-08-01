const express = require('express');
const app = express();
const session = require('express-session');
const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');
const mainroute = require('./controller/main_routes');
const requests = require('./controller/server_posts');
const ip = require('ip')
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}));
app.set('view engine', 'hbs');
app.use(express.static('views'));
app.use(express.static('views/assets'));
app.use('/images', express.static('images'));
app.use('/', mainroute);
app.use(requests);
app.listen(4000, ip.address(), () => {
    console.log("Website IP address: http://" +ip.address()+":4000");
})
