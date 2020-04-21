var express = require('express');
var router = express.Router();
const eventModel = require('../utility/eventsDB.js');
let eventDB = new eventModel();

router.get('/', async function(req,res){
  let event = await eventDB.getEvent(req.query.id);
  res.render('eventDetail', {data : req.session.currentUser, datap: event})
});


module.exports = router;
