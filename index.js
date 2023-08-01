const express = require('express');
const app = express();
const mainroute = require('./controller/main_routes');
app.use('views', express.static('views'));
app.set('view engine', 'hbs');
app.use(express.static('views/assets'));
app.use('/images', express.static('images'));
app.use(express.static('views'));
app.use('/', mainroute);
app.listen(4000, () => {
    console.log("Website started at port 4000");
})
