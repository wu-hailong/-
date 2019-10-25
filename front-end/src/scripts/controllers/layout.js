import layoutView from "../views/layout.art"

class Layout{
    constructor(){
        this.render()
    }
    render(){
        let html = layoutView();
        $("#container").html(html)
        this.bindEvent()
    }
    bindEvent(){
        $(".logout").on("click",this.showLogin.bind(this))
    }
    showLogin(){
        $("#login-page").fadeIn(500)
    }
}

export default new Layout()