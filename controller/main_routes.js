const routes = require('express').Router();

// Landing
routes.get("/", (req, res) => {
    res.render('index');
})

// Kapitan

routes.get("/kapitan/home", (req, res) => {
    res.render('kapitan/kapitan-home');
})

routes.get("/kapitan/admin", (req, res) => {
    res.render('kapitan/kapitan-admin');
})
routes.get("/kapitan/admin/add-admin", (req, res) => {
    res.render('kapitan/kapitan-add-admin');
})
routes.get("/kapitan/admin/list", (req, res) => {

    res.render('kapitan/kapitan-admin-list');
})
routes.get("/kapitan/master-list", (req,res) => {
    res.render('kapitan/kapitan-master-list');
})

// Admin

routes.get("/admin/home", (req, res) => {
    res.render('admin/admin-home');
})
routes.get("/admin/master-list", (req, res) => {
    res.render('admin/admin-master-list');
})
module.exports = routes;