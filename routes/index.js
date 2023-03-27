var express = require("express");
const IndexController = require("../controller/indexController");

var router = express.Router();

let indexController = new IndexController();

/* GET home page. */
router.get("/",indexController.getIndex);

module.exports = router;
