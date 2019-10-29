import positionListView from "../views/position.art"
import positionAddView from "../views/position.add.art"
import httpModel from "../models/http"
export const list = async (req,res,next)=>{
    let result = await httpModel.get({
        url:"/api/position/findAll"
    })
    if(result.ret){
        res.render(positionListView())
    }else{
        alert("请先登录！！！！")
        res.go("/home")
    }
}

export const add = (req,res,next)=>{
    res.render(positionAddView())
}