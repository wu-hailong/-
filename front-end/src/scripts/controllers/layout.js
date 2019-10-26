import layoutView from "../views/layout.art"
import httpModel from "../models/http"
import login from "./login"
class Layout{
    constructor(){
        // this.getAjax()
        this.render()
        // this.isSignin = false
        // this.username = ''
    }
   async render(){
        await this.getAjax()
        let html = layoutView({
            isSignin:this.isSignin,
            username:this.username
        })
        $("#container").html(html)
        //渲染登录页面
        login.render()
        this.bindEvent()
    }
    bindEvent(){
        //隐藏登录框       
        $("#cancel-btn").on("click",this.hideLogin.bind(this))
        //判断登录 还是 注册  对url进行处理
        $(".logout").on("click",this.handleUrl.bind(this))
        //提交表单
        $("#submit-btn").on("click",this.handleSubmit.bind(this))
        //退出登录
        $("#container").on("click",".signout",this.signOut.bind(this))
        
        $(".login-wrap input").on("focus",function(){
            $(".tips").html("")
        })
    }
    //提交表单  进行ajax请求
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
    //get ajax请求
    async getAjax(){
        let result = await httpModel.get({
            url:"/api/users/isSignin"
        })
        // console.log(result)
        let username = result.data.username
        this.isSignin = username ? true : false
        this.username = username
    }
    submitSuccess(result){
        // console.log(result) 
        let {message} = result.data
        let {username}= result.data 
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
            //设置session-cookie
          this.getAjax()
            // 重新渲染页面
          this.render()
        }else if(message === "注册成功."){
            alert(message)
        }
    }
    
    //退出登录逻辑
    async signOut(){
        await httpModel.get({
            url:"/api/users/signout"
        })
        this.render()
    }

    handleUrl(){     
        let {target} = event
        this.url = "/api/users/" + $(target).data().type
        //渲染标题
        $("#login-title").html($(target).html())
        $("#login-page").fadeIn(500)
    }
    hideLogin(){
        $("#login-page").fadeOut(500)
        $(".tips").html("")
    }
}

export default new Layout()