class User{
    
    constructor(uid, fname, lname, email){
        this.uid = uid;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
    }


    getuid(){
        return this.uid;
    }
    getfname(){
        return this.fname;
    }
    getlname(){
        return this.lname;
    }
    getemail(){
        return this.email;
    }
    setuid(value){
        this.uid = value;
    }
    setfname(value){
        this.fname = value;
    }
    setlname(value){
        this.lname = value;
    }
    setemail(value){
        this.email = value;
    }
}

module.exports = User;