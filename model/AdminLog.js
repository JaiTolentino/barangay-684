class AdminLog{
    constructor(log_id, admin_id, date_loggedin, time_loggedin, date_loggedout, time_loggedout){
        this.log_id = log_id;
        this.admin_id = admin_id;
        this.date_loggedin = date_loggedin;
        this.time_loggedin = time_loggedin;
        this.date_loggedout = date_loggedout;
        this.time_loggedout = time_loggedout;
    }
    getLogId(){
        return this.log_id;
    }
    setLogId(log_id){
        this.log_id = log_id
    }
    getAdminId(){
        return this.admin_id;
    }
    setAdminId(admin_id){
        this.admin_id = admin_id;
    }
    getDateLoggedin(){
        return this.date_loggedin
    }
    setDateLoggedin(date_loggedin){
        this.date_loggedin = date_loggedin;
    }
    getTimeLoggedin(){
        return this.time_loggedin;
    }
    setTimeLoggedin(time_loggedin){
        this.time_loggedin = time_loggedin;
    }
    getDateLoggedout(){
        return this.date_loggedout;
    }
    setDateLoggedout(date_loggedout){
        this.date_loggedout = date_loggedout;
    }
    getTimeLoggedout(){
        return this.time_loggedout;
    }
    setTimeLoggedin(time_loggedout){
        this.time_loggedout = time_loggedout;
    }
}
module.exports = AdminLog;