var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send({ title: 'Welcome to roaster app' });
});

router.post('/login', function(req, res, next) {
  console.log(req.body);
  res.json({content: req.body});
});

module.exports = router;
