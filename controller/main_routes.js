const express = require('express');
const routes = express.Router();
const Admin = require('../model/Admin')
const kapitan_connection = require('./kapitan_connection');
const admin_connection = require('./admin_connection');
// Landing
routes.get("/", (req, res) => {
    res.render('index');
})
routes.get("/logout", (req, res) => {
    var user = new Admin();
    req.session.kapitan ? user = req.session.kapitan : user = req.session.admin;
    req.session.destroy();
    req.session = null;
    res.redirect('/');
})

// Kapitan

routes.get("/kapitan/home", (req, res) => {
    req.session.kapitan ? res.render('kapitan/kapitan-home') : res.redirect('/');
})
routes.get("/kapitan/admin", (req, res) => {
    req.session.kapitan ? res.render('kapitan/kapitan-admin-option') : res.redirect('/');
})
routes.get("/kapitan/admin/add-admin", (req, res) => {
    req.session.kapitan ? res.render('kapitan/kapitan-add-admin') : res.redirect('/');
})
routes.get("/kapitan/admin/list", (req, res) => {
    if (req.session.kapitan) {
        kapitan_connection.query("SELECT * FROM users", (err, result) =>{
            res.render('kapitan/kapitan-admin-list', {data: result})
        })
    }else {
        res.redirect('/');
    }
})
routes.get("/kapitan/masterlist", (req, res) => {
    req.session.kapitan ? res.render('kapitan/kapitan-residents-option') : res.redirect('/');
})
routes.get("/kapitan/masterlist/list", (req, res) => {
    if(req.session.kapitan){
        kapitan_connection.query("SELECT * FROM masterlist", (error, result) => {
            if(error) console.log(error);
            else {
                res.render('kapitan/kapitan-residents-lists', {data: result});
            }
        })
    }else {
        res.redirect('/');
    }
    
})
routes.get("/kapitan/masterlist/add", (req,res) => {
    req.session.kapitan ? res.render('kapitan/kapitan-add-residents') : res.redirect('/');
})
routes.get("/kapitan/masterlist/edit", (req,res) => {
    if(req.session.kapitan){
        const resident_id = req.session.editid;
        kapitan_connection.query("SELECT * FROM masterlist WHERE resident_id = ?", [resident_id], (err, result) => {
            if(err) console.log(err);
            else {
                res.render('kapitan/kapitan-edit-residents', {data: result});
            }
        })
    }else {
        res.redirect('/');
    }
})

// Admin

routes.get("/admin/home", (req, res) => {
    req.session.admin ? res.render('admin/admin-home') : res.redirect('/');
})
routes.get("/admin/masterlist/list", (req, res) => {
    if(req.session.admin) {
        admin_connection.query("SELECT * FROM adminviewmasterlist", (error, result) => {
            if(error) console.log(error);
            else {
                res.render('admin/admin-master-list', {data: result});
            }
        })
    }else {
        res.redirect('/');
    }
})
routes.get("/admin/masterlist", (req, res) => {
    req.session.admin ? res.render('admin/admin-option') : res.redirect('/');
})
routes.get("/admin/masterlist/add", (req, res) => {
    req.session.admin ? res.render('admin/admin-add-residents') : res.redirect('/');
})
module.exports = routes;