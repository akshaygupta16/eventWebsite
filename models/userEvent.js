class userEvent{
    constructor(event,rsvp){
        this.event=event;
        this.rsvp=rsvp
    }

    getrsvp(){
        return this.rsvp;
    }

    setrsvp(rsvp){
        return this.rsvp;
    }
}

module.exports = userEvent;