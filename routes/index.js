var express = require("express");
var router = express.Router();
const IndexController = require("../controller/index.controller");

let indexController = new IndexController();
/* GET home page. */
router.get("/",indexController.getIndex);

module.exports = router;
