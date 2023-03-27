var express = require("express");
const IndexController = require("../controller/index.controller");

var router = express.Router();

let indexController = new IndexController();

/* GET home page. */
router.get("/",indexController.getIndex);

module.exports = router;
