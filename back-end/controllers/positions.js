
const positionModel = require("../models/positions")
const moment = require('moment')
const fs = require('fs')
const path = require("path")
const findAll = async(req,res,next)=>{
    res.set("Content-Type", "application/json; charset=utf-8")
    let pageInfo = req.query
    let result = await positionModel.findAll(pageInfo)
    if(result){
        res.render("succ",{
            data:JSON.stringify(result)
        })
    }else{
        res.render("fail",{
            data:JSON.stringify({})
        })
    }
}
const findOne = async (req,res,next)=>{
    let id = req.query.id
    // console.log(id)
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
    data.createTime = moment().format('YYYY-MM-DD HH:mm')
    data.companyLogo = req.filename
   
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
    data.createTime = moment().format('YYYY-MM-DD HH:mm')

    if(req.filename === ''){
        delete data.companyLogo
    }else{
        data.companyLogo = req.filename
    }
    // console.log(data)
    let result = await positionModel.update(data)
    // console.log(result)

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

const remove = (req,res,next)=>{
    // console.log(req.body.id) 
    let { id , tempCompanyLogo} = req.body
    console.log(req.body)
    //删除数据
    let result = positionModel.remove(id)
    //删除图片
    if(result){
        fs.unlink(path.resolve(__dirname,"../public/uploads/" + tempCompanyLogo),(err)=>{
            if(err){
                console.log(err.message)
            }
        })
    }
    // console.log(result)
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

const search = async (req,res,next)=>{
    let {keywords} = req.body
    // console.log(keywords)
    let result = await positionModel.search(keywords)
    // console.log(result)
    if(result){
        res.render('succ',{
            data:JSON.stringify({
               list:result
            })
        })
    }else{
        res.render('fail',{
            data:JSON.stringify({
                message:'查询失败.'
            })
        })
    }
}
module.exports = {
    findAll,
    findOne,
    save,
    update,
    remove,
    search
}
