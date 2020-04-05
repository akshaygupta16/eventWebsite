var express = require('express');
var router = express.Router();
const allevents = require('../utility/eventsDB.js');


router.get('/', function(req,res){
    res.render('allevents', {data : req.session.currentUser, events : allevents.getEvents()});
});


module.exports = router;
