var express = require('express');
var router = express.Router();

//Required Utilites
const eventModel = require('../utility/eventsDB');
const userModel = require('../utility/userDB');

let userDB = new userModel();
let eventsDB = new eventModel();

//login route
router.get('/login', function(req,res){
    res.render('login');
});

//profile route(once a user logs in)
//using router.all(...) to handle both GET and POST
router.all('/profile', async function(req,res,next){

    if (req.body.username == "" || req.body.password == ""){
        console.log("Please enter both username and password");
        res.render('login');
    }
    //creating new user object
    let user = await userDB.getUser(req.body.username);

    //if user with provided email id exists in db
    if (typeof user != "undefined"){
    //registering the user in the session
    req.session.currentUser = user;
    res.render('savedConnections',  {data : req.session.currentUser, datap : user.profile});
    }else{
        res.send("No such user found in DB., try a different email ID!")
    }
});

//  route : handling user input data to create event
router.post('/createevent', async function(req,res){
    await eventsDB.addNewEvent({title : req.body.title, date : req.body.date, time : req.body.time, location : req.body.location, details : req.body.details, category : req.body.category },req.session.currentUser);
    res.render('eventDetail', {data : req.session.currentUser, datap : {title : req.body.title, date : req.body.date, time : req.body.time, location : req.body.location, category : req.body.category }})
    
});

//  route : save event to profile/ add rsvp
router.get('/add', async function(req,res,next){
   
    let currUser = await userDB.getUser(req.session.currentUser.email);
    
    //if user is logged in
    if(typeof currUser != "undefined"){
        const id = req.query.id;
        const rsvp = req.query.rsvp
        
        //if the event exists in user's saved event list 
        for (var i = 0; i < currUser.profile.length; i++){
            console.log("In for loop");
            
            if(currUser.profile[i].event._id == req.query.id){
                console.log("Event already in saved events")

                //saving updated rsvp for an event
                let user = await userDB.updateRSVP(id,rsvp,currUser);
                console.log("RSVP Changed", user.profile);
                res.render('savedConnections', {data : user, datap : user.profile});
                return;
            }
        }

        //if the event doesn't already exist in users profile - adding the userEvent the user's events list
        let eventToAdd = await eventsDB.getEvent(id);
        currUser.profile.push({event:eventToAdd, rsvp:rsvp});
        
        let user = await userDB.addRSVP(eventToAdd, rsvp, currUser._id);
        res.render('savedConnections',  {data : user, datap : user.profile});

        //saving the changes to the session user object
        req.session.currentUser = userDB.getUser(req.session.currentUser.email);
        next();
    }

    //if user isn't logged in
    else{
        res.render('login')
        next();
    }

});

//Delete event route/function
router.get('/delEvent', async function(req,res){
   
    var currUser = req.session.currentUser;

    let user = await userDB.delRSVP(req.query.id,currUser);
    res.render('savedConnections', {data : req.session.currentUser, datap : user.profile});

    //saving the changes to the session user object
    req.session.currentUser = userDB.getUser(req.session.currentUser.email);
});

//Update event route/function
router.get('/updateEvent', async function(req,res){ 
    console.log("IN UPDATE EVENT",req.query.id);
    
    //fetching the event object for which the rsvp is to be updated
    let event = await eventsDB.getEvent(req.query.id);
    res.render('eventDetail', {data : req.session.currentUser, datap: event})

    //saving the changes to the session user object
    req.session.currentUser = userDB.getUser(req.session.currentUser.email);
});


//logout route
router.get('/logout', function(req,res,next){
    //explore session data
    console.log("before delete " + req.session);
    //delete session info
    req.session.destroy(function(err) {
        if (err) {
            console.log("error deleting session");
        } else {
            console.log("session deleted");
        }
        next();
    });
    res.render('login')
    console.log("session data after delete " + req.session);
})


module.exports = router;
