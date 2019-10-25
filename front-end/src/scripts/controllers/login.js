import loginView from "../views/login.art"
import httpModel from "../models/http"
class Login{
    constructor(){
        this.render()
    }
    render(){
        let html = loginView()
     
        $("#login-page").html(html)  
        this.bindEvent()
    }
    bindEvent(){
        //隐藏登录框
        $("#cancel-btn").on("click",this.hideLogin.bind(this))
        //判断登录 还是 注册  对url进行处理
        $(".logout").on("click",this.handleUrl.bind(this))
        //提交表单
        $("#submit-btn").on("click",this.handleSubmit.bind(this))
        $(".signout").on("click",this.signOut)
    }
    async handleSubmit(){
        let data = $(".form-login").serialize();
        // console.log(this.url)
        let result = await httpModel.get({
            url: this.url,
            type :"POST",
            data
        })

        this.submitSuccess(result)
        // console.log(data)
    }
    submitSuccess(result){
        // console.log(result) 
        let {message} = result.data
        $(".form-login")[0].reset()
        if(result.ret){
            this.hideLogin()
            this.reRenderTop(message)
        }else{
            $(".tips").html("*"+ message)
        }
    }
    reRenderTop(message){
        // console.log(message)
        if(message === "登录成功."){
          this.signinSuccess()
        }else if(message === "注册成功."){
            alert(message)
        }
    }
    //登录成功逻辑
    signinSuccess(){ 
        //隐藏登录注册按钮
        $(".top-tit").addClass("hide-btn")
        $(".user-id").html("Welcome!" + "userName")
        $(".img-circle")[0].src = "/assets/libs/img/user.jpg"
    }
    //退出登录逻辑
    signOut(){
        // 显示登录注册按钮
        $(".top-tit").removeClass("hide-btn")
        $(".user-id").html("No Login...")
        $(".img-circle")[0].src = "/assets/libs/img/unlogin.jpg"
    }
    handleUrl(){     
        let {target} = event
        this.url = "/api/users/" + $(target).data().type
        //渲染标题
        $("#login-title").html($(target).data().type)
    }
    hideLogin(){
        $("#login-page").fadeOut(500)
        $(".tips").html("")
    }
}
export default new Login()