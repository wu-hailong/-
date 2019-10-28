import listView from "../views/list.art"

import httpModel from "../models/http"
export const list = async (req,res,next)=>{
    let result = await httpModel.get({
        url:"/api/position/findAll"
    })
    if(result.ret){
        res.render(listView())
    }else{
        alert("请先登录！！！！")
        res.go("/home")
    }
}