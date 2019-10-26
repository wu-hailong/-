import loginView from "../views/login.art"
// import httpModel from "../models/http"
class Login{
    constructor(){
        this.render()
    }
    render(){
        let html = loginView()
     
        $("#login-page").html(html)  
        // this.bindEvent()
    }

}
export default new Login()