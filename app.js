//setup express for routing
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

//set view Engine to ejs
app.set('view engine','ejs');
//set the path for static resources to be applicable
app.use('/assets',express.static('assets'));

//set session resources
app.use(session({secret: 'NBAD	',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

//index page controller
var index = require('./routes/index.js');
app.use('/',index);

//Browse events page controller
var allevents = require('./routes/allevents.js');
app.use('/allevents', allevents);

//Event detail page controller
var eventDetail = require('./routes/eventDetail.js');
app.use('/event', eventDetail);

//User Events page controller
var savedConnections = require('./routes/savedConnections.js');
app.use('/savedConnections', savedConnections);

//New Event page controller
var newEvent = require('./routes/newEvent.js');
app.use('/newEvent', newEvent);

//About page controller
var about = require('./routes/about.js');
app.use('/about', about);

//Contacts page controller
var contact = require('./routes/contact.js');
app.use('/contact', contact);

//User activity controller
var userController = require('./routes/userController.js')
app.use('/user', userController)

//start a local server at port 8082
app.listen(8082, function(){
    console.log("Listening on port 8082")
});