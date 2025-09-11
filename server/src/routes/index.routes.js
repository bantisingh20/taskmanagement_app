//const express = require('express');
const router = require('express').Router(); 

const routes = [
   { path:'priority' , module:'priority', },
   { path:'status' , module:'status', },    
];

routes.forEach(route => {
    router.use(`/${route.path}`, require(`./${route.module}.routes`));
});
//router.use('/priorities', require('./priority.routes'));

module.exports = router;