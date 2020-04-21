var express = require('express');
var router = express.Router();
const userModel = require('../utility/userDB');
let userDB = new userModel();

router.get('/', async function(req,res){
  
  let user = await userDB.getUser(req.session.currentUser.email);
  res.render('savedConnections', {data : user , datap : user.profile});
});


module.exports = router;