var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    fname : {type : String, required: true},
    lname : {type : String, required: true},
    email : {type : String, required: true, unique:true},
    password : {type : String, required: true},
    profile : {type : [{event : {type : Object, required: true}, rsvp : {type: String, required: true}}]}
});

var userDB = mongoose.model("User", userSchema);

class UserDB{
    //get user from the db that matches the user given email
    getUser(email){
        return new Promise((resolve,reject)=>{
            userDB.find({email:email}, function(err,docs){
                if (err) console.error(err);
                else{
                    console.log("Found user in DB",docs[0]);
                    resolve(docs[0]);
                }
            }).catch((err)=>{
                return reject(err);
        })
        })
    };

    //add an rsvp to a users profile
    addRSVP(event,rsvp,uid){
        return new Promise((resolve,reject)=>{
            userDB.findOne({_id : uid}, function(err,doc){
                if(err) console.error(err);
                else{
                    if(doc){
                        doc.profile.push({event:event,rsvp:rsvp})
                        doc.save(function(err,doc){
                            if (err) console.log(err);
                            resolve(doc);   
                            console.log("Event added to user's list");
                            
                            });
                    }else{
                        console.log("No such event found");
                        
                    }
                }
            }).catch((err)=>{
                return reject(err);
        })
        })
    }

    //updating rsvp for an event in the users profile
    updateRSVP(eventid,rsvp,user){
        return new Promise((resolve,reject)=>{
            userDB
            .findOne({_id:user._id})
            .then((user)=>{
                for (var i =0; i<user.profile.length; i++){
                    if (user.profile[i].event._id==eventid){
                        user.profile[i].rsvp = rsvp;
                    }
                }

                user.save(function(err,data){
                    if(data){
                        resolve(data);
                        console.log("RSVP changed");
                    }else{
                        console.error(err);
                    }
                })
            }).catch((err)=>{
                return reject(err);
            })
        })
    }

    //deleting rsvp from the user profile
    delRSVP(eventid,user){
        return new Promise((resolve,reject)=>{
            let profileid = null
            userDB
            .findOne({_id : user._id})
            .then((user)=>{
                
                for (var i =0; i<user.profile.length; i++){
                    if (user.profile[i].event._id==eventid){
                        profileid = user.profile[i]._id;
                        break;
                    }
                }
                user.profile.id(profileid).remove();
                user.save(function(err,data){
                    if(data){
                        resolve(data);
                        console.log("Event Deleted");    
                    }else{
                        console.error(err)
                    }
                })
            }).catch((err)=>{
                return reject(err)
            })
        })
    }
}
module.exports = UserDB;