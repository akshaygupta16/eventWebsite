var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
    if(req.session.currentUser){
        res.render('form.ejs', {data : req.session.currentUser});
    }else{
        res.render('login.ejs')
    }

});

module.exports = router;

