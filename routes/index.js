var express = require('express');
var router = express.Router();



router.get('/', function(req,res){
  // console.log("Current user is: ",express.session.currentUser);
  
  res.render('index', {data : req.session.currentUser});
});


module.exports = router;
