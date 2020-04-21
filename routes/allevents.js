var express = require('express');
var router = express.Router();
const eventModel = require('../utility/eventsDB');
const eventDB = new eventModel();

router.get('/', async function(req,res){
    let events = await eventDB.getEvents();
    res.render('allevents', {data : req.session.currentUser, events : events});
});


module.exports = router;
