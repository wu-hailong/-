
const positionModel = require("../models/positions")

const findAll = (req,res,next)=>{
    res.set("Content-Type", "application/json; charset=utf-8")
    res.render("succ",{
        data:JSON.stringify({
            list:[]
        })
    })
}

const save = async (req,res,next)=>{
    res.set("Content-Type", "application/json; charset=utf-8")
    let data = req.body
    let result = await positionModel.save(data)
    if(result){
        res.render("succ",{
            data:JSON.stringify({
                message:"数据添加成功."
            })
        })
    }else{
        res.render("fail",{
            data:JSON.stringify({
                message:"数据添加失败."
            })
        })
    }
}
module.exports = {
    findAll,
    save
}
