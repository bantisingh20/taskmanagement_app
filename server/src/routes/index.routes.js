//const express = require('express');

const router = require('express').Router();
const Authcontroller = require("../controller/auth.controller");

const Parentfolder = 'modules/';
const routes = [
    { path: 'employee', module: 'Employee/employee' },
    { path: 'priority', module: 'Priority/priority', },
    { path: 'status', module: 'Status/status', },
    { path: 'menu', module: 'Menu/menu'},
    { path: 'task', module: 'Task/task'},
];

router.post("/auth/login",Authcontroller.login);
router.post("/auth/register",Authcontroller.register);
 
routes.forEach(route => {
    router.use(`/${route.path}`, require(`../${Parentfolder}${route.module}.routes`));
    //console.log(`../${Parentfolder}${route.module}.routes`)
});

module.exports = router;