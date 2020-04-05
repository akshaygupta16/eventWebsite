var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
  user = req.session.currentUser;
  profile = user.profile;
  res.render('savedConnections', {data : req.session.currentUser , datap : profile});
});


module.exports = router;