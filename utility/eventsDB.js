var eventClass = require('../models/event');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title : { type : String, required: true},
    author : { type : String},
    date : { type : String, default: "TBA"},
    time : { type : String, default: "TBA"},
    location : { type : String, default: "TBA"},
    category : { type : String, required: true}
})

eventDB = mongoose.model("Event", eventSchema);

class EventDB{
    
    //new event created by the user
    addNewEvent(event,user){
        return new Promise((resolve,reject)=>{
            let theEvent = new eventDB({
                title:event.title,
                author: user._id,
                date:event.date,
                time:event.time,
                location:event.location,
                category:event.category
            });

            theEvent.save(function(err,data){
                if(data){
                    resolve(data);
                    console.log("Event Added");
                    console.log(data);
                }else{
                    return reject(err);
                }
                })
            })
        }

    getEvents(){
        return new Promise((resolve,reject)=>{
            eventDB.find({}, function(err,docs){
                if(err) console.error(err);
                if (docs.length > 0){
                    resolve(docs);
                }else{
                    console.log("No Events found");
                    resolve(docs);
                }
            })
        }).catch((err)=>{
            return reject(err);
        })
    };

    getEvent(id){
        return new Promise((resolve,reject)=>{
            eventDB.find({_id:id}, function(err,docs){
                if (err) console.error(err);
                if(docs){
                    resolve(docs[0]);
                }else{ 
                    resolve(docs[0]);
                }
            })
        }).catch((err)=>{
            return reject(err);
        })
    };
}


module.exports= EventDB;




