const express = require('express');
const router = express.Router();
const controller = require("./menu.controller")

router.get("/getallmenu", controller.getAllMenu);
router.post("/add-menu", controller.AddMenu);

module.exports = router;