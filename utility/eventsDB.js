var eventClass = require('../models/event');

let ef1 = new eventClass(1,"Festivity One", "Author_ef1", "Date_ef11", "Time_ef11", "Location_ef1", "one");
let ef2 = new eventClass(2,"Festivity Two", "Author_ef2", "Date_ef2", "Time_ef2", "Location_ef2", "one");
let ef3 = new eventClass(3,"Festivity Three", "Author_ef3", "Date_ef3", "Time_ef3", "Location_ef3", "one");
let ea1 = new eventClass(4,"Adventure One", "Author_ea1", "Date_ea1", "Time_ea1", "Location_ea1", "two");
let ea2 = new eventClass(5,"Adventure Five", "Author_ea2", "Date_ea2", "Time_ea2", "Location_ea2", "two");
let ea3 = new eventClass(6,"Adventure Six", "Author_ea3", "Date_ea3", "Time_ea3", "Location_ea3", "two");




var allEvents = [ef1,ef2,ef3,ea1,ea2,ea3];

const getEvents = () => {
    return allEvents;
}

const getEvent = (id) => {
    for(var i = 0; i < allEvents.length; i++){
        if(allEvents[i].id == id){
            return allEvents[i]
        }
    }
}
exports.getEvents = getEvents;
exports.getEvent = getEvent;
exports.allEvents = allEvents;




