var express = require('express');
var router = express.Router();

//Required Utilites
var userClass = require('../models/user')
var userEvent = require('../models/userEvent')

//Required models
var userProfile = require('../utility/userProfile')
const allevents = require('../utility/eventsDB.js');

//login route
router.get('/login', function(req,res){
    res.render('login');
});

//profile route(once a user logs in)
//using router.all(...) to handle both GET and POST
router.all('/profile', function(req,res,next){

    if (req.body.username == "" || req.body.password == ""){
        console.log("Please enter both username and password");
        res.render('login');
    }
    //creating new user object
    var user = new userClass(100,"Bob","James",req.body.username);
    profile = new userProfile(user.uid);
    
    //add a profile to the user to maintain all saved events
    user.profile = profile;
    
    //registering the user in the session
    req.session.currentUser = user;
    
    res.render('savedConnections',  {data : req.session.currentUser, datap : profile});

});

//save event to profile route/function
router.get('/add', function(req,res,next){
   
    var currUser = req.session.currentUser
    
    //if user is logged in
    if(typeof currUser != "undefined"){
        const id = req.query.id;
        const rsvp = req.query.rsvp
        profile = req.session.currentUser.profile

        //if the event exists in user's saved event list 
        for (var i = 0; i < profile.events.length; i++){
            if(profile.events[i].event.id == id){
                profile.events[i].rsvp = rsvp;
                res.render('savedConnections',  {data : req.session.currentUser, datap : profile});
                next();
            }
        }
        
        //creating a userEvent object for the selected event
        eventToAdd = new userEvent(allevents.getEvent(id),rsvp)
       
        //adding the userEvent the user's events list
        profile.events.push(eventToAdd);
        res.render('savedConnections',  {data : req.session.currentUser, datap : profile});
        next();
    }
    //if user isn't logged in
    else{
        res.render('login')
        next();
    }

});

//Delete event route/function
router.get('/delEvent', function(req,res){
   
    const id = req.query.id
    profile = req.session.currentUser.profile
    
    //find the event in userevents list and splice the list
    for (var i = 0; i < profile.events.length; i++){
        if(profile.events[i].event.id == id){
            profile.events.splice(i,1)
        }
    }
    res.render('savedConnections', {data : req.session.currentUser, datap : profile});
});

//Update event route/function
router.get('/updateEvent', function(req,res){
    const id = req.query.id
    profile = req.session.currentUser.profile
    res.render('eventDetail', {data: allevents.getEvent(id)})
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
