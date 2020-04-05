var express = require('express');
var router = express.Router();
const allevents = require('../utility/eventsDB.js');

router.get('/', function(req,res){
  const id = req.query.id;
  res.render('eventDetail', {data: allevents.getEvent(id)})
});


module.exports = router;
