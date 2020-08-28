var express = require('express');
var router = express.Router();
//const path = require("path");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HOME' });
});
//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "pug");
//app.use(express.static(path.join(__dirname, "public")));

module.exports = router;
