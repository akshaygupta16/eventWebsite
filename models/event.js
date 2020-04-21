class EventClass {
    constructor(id, title, author, date, time, location, topic){
        this.id=id;
        this.title=title;
        this.author=author;
        this.date=date;
        this.time=time;
        this.location=location;
        this.category=this.category;
    }

    getID(){
        return this.id;
    }

    get Title(){
        return this._title;
    }

    getAuthor(){
        return this.author;
    }

    getDate(){
        return this.date;
    }

    getTime(){
        return this.time;
    }

    getLocation(){
        return this.location;
    }

    getCategory(){
        return this.category;
    }

    getDetails(){
        return this.details;
    }

    setID(value){
        this.id = value;
    }

    setTitle(value){
        this.title = value;
    }

    setAuthor(value){
        this.author = value;
    }
    setDate(value){
        this.date = value;
    }
    setTime(value){
        this.time = value;
    }
    setLocation(value){
        this.location = value;
    }
    setCategory(value){
        this.category = value;
    }

    setDetails(value){
        this.details = value;
    }
}

module.exports = EventClass;