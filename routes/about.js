var express = require('express');
var router = express.Router();


router.get('/', function(req,res){
  res.render('about', {data : req.session.currentUser} );
});


module.exports = router;
