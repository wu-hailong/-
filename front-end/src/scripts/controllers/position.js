import positionListView from "../views/position.art"
import positionAddView from "../views/position.add.art"
import positionUpdateView from "../views/position.update.art"
import httpModel from "../models/http"

//提交表单信息
function  _submitForm(){
    $(".submit-btn").on("click",async()=>{
       let $form = $(".form-horizontal")
       let data = $form.serialize()
       let result = await httpModel.update({
           url:'/api/position',
           data
       })
    //    console.log(result)
       if(result.ret){
           $form[0].reset()
       }else{
           alert(result.data.message)
       }
    })
}

//修改跳转
function _updateClick(res){
    $(".update-btn").on("click",function(){
        let id = $(this).attr('data-id')
        res.go('/position_update',{id})
    })
}

//修改数据
function  _updateForm(id,res){
    $(".update-form-btn").on("click",async()=>{
       let $form = $(".form-horizontal")
       let data = $form.serialize() + '&id=' + id
        // console.log(data)

       let result = await httpModel.update({
           url:'/api/position',
           data,
           type:'patch'
       })
    //    console.log(result)
       if(result.ret){
          res.go('/position')
       }else{
           alert(result.data.message)
       }
    })
}

//删除数据
function _removeClick(res){
    $(".delete-btn").on("click",async function(){
        let id = $(this).attr('data-id')
        let result = await httpModel.update({
            url:'/api/position',
            type:'delete',
            data:{
                id
            }
        })
        console.log(result)
        if(result.ret){
            res.go('/position?t=' + Date.now())//自动渲染
        }
    })
}
export const list = async (req,res,next)=>{

    let result = await httpModel.get({
        url:"/api/position"
    })
    // console.log(result)
    if(result.ret){
        let list = result.data.list
        res.render(positionListView(
            {
                list
            }
        ))
       
    }else{
        alert("请先登录！！！！")
        res.go("/home")
    }
    //跳转修改页面功能
    _updateClick(res)
    //删除页面功能
    _removeClick(res)
}
//添加数据
export const add = (req,res,next)=>{
    res.render(positionAddView())
    //提交表单
    _submitForm()
}
//修改数据
export const update = async(req,res,next)=>{
    let id = req.body.id    
    // console.log(id)
    //数据回填
    let result = await httpModel.get({
        url:'/api/position/findOne',
        data:{
            id
        }
    })
    res.render(positionUpdateView({
        item:result.data
    }))
    // 修改数据功能
    _updateForm(id,res)
}