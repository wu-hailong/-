
const positionModel = require("../models/positions")

const findAll = async(req,res,next)=>{
    res.set("Content-Type", "application/json; charset=utf-8")
    
    let result = await positionModel.findAll()
    if(result){
        res.render("succ",{
            data:JSON.stringify({
                list:result
            })
        })
    }else{
        res.render("fail",{
            data:JSON.stringify({
                list:[]
            })
        })
    }
}
const findOne = async (req,res,next)=>{
    let id = req.query.id
    console.log(id)
    let result = await positionModel.findOne(id)
    if(result){
        res.render('succ',{
            data:JSON.stringify(result)
        })
    }else{
        res.render('fail',{
            data:JSON.stringify(result)
        })
    }
}
const save = async (req,res,next)=>{
    res.set("Content-Type", "application/json; charset=utf-8")
    let data = req.body
    data.createTime = "2019-10-29 15:23"
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

const update = async (req,res,next)=>{
    let data = req.body

    let result = await positionModel.update(data)

    if(result){
        res.render('succ',{
            data:JSON.stringify({
                message:'数据修改成功.'
            })
        })
    }else{
        res.render('fail',{
            data:JSON.stringify({
                message:'数据修改失败.'
            })
        })
    }
}

const remove = async (req,res,next)=>{
    // console.log(req.body.id)
    let id = req.body.id
    let result = await positionModel.remove(id)
    console.log(result)
    if(result){
        res.render('succ',{
            data:JSON.stringify({
                message:'数据删除成功.'
            })
        })
    }else{
        res.render('fail',{
            data:JSON.stringify({
                message:'数据删除失败.'
            })
        })
    }
}
module.exports = {
    findAll,
    findOne,
    save,
    update,
    remove
}
