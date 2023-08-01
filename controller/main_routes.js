const express = require('express');
const routes = express.Router();

// Landing
routes.get("/", (req, res) => {
    res.render('index');
})

// Kapitan

routes.get("/kapitan/home", (req, res) => {
    req.session.kapitan ? res.render('kapitan/kapitan-home') : res.redirect('/');
})
routes.get("/kapitan/admin", (req, res) => {
    req.session.kapitan ? res.render('kapitan/kapitan-admin') : res.redirect('/');
})
routes.get("/kapitan/admin/add-admin", (req, res) => {
    req.session.kapitan ? res.render('kapitan/kapitan-add-admin') : res.redirect('/');
})
routes.get("/kapitan/admin/list", (req, res) => {
    req.session.kapitan ? res.render('kapitan/kapitan-admin-list') : res.redirect('/');
})
routes.get("/kapitan/master-list", (req,res) => {
    req.session.kapitan ? res.render('kapitan/kapitan-master-list') : res.redirect('/');
})

// Admin

routes.get("/admin/home", (req, res) => {
    req.session.admin ? res.render('admin/admin-home') : res.redirect('/');
})
routes.get("/admin/master-list", (req, res) => {
    req.session.admin ? res.render('admin/admin-master-list') : res.redirect('/');
})
module.exports = routes;