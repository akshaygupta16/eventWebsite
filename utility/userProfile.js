// var userProfile = function(uid){
//     this.uid=uid;
//     this.events = [];
//     this.addEvent = function(userEvent){
//         this.events.push(userEvent)
//     }
//     updateRSVP = function(userEvent,rsvp){
//         userEvent.rsvp = rsvp;
//     }
//     delEvent = function(id){
//         for(var i = this.events.length - 1; i >= 0; i--) {
//             if(this.events[i].id === id) {
//                 this.events.splice(i, 1);
//             }
//         }
//     }
//     this.getallEvents = function(){
//         return this.events;
//     }
// }

class userProfile{
    constructor(uid){
    this.uid=uid;
    this.events = [];
    }

    getUid(){
        return this.uid
    }
    addEvent(userEvent){
        this.events.push(userEvent)
    }
    updateRSVP (userEvent,rsvp){
        userEvent.rsvp = rsvp;
    }
    delEvent(value){
        for(var i = this.events.length - 1; i >= 0; i--) {
            if(this.events[i].id === value) {
                this.events.splice(i, 1);
            }
        }
    }
    getallEvents (){
        return this.events;
    }
}
module.exports = userProfile;