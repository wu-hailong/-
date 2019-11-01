import positionListView from "../views/position.art"
import positionAddView from "../views/position.add.art"
import positionUpdateView from "../views/position.update.art"
import httpModel from "../models/http"
import _ from "lodash"

let count = 3

//提交表单信息 添加数据
function  _submitForm(){
    // $(".submit-btn").on("click",async()=>{
       let $form = $(".form-horizontal")
    //    let data = $form.serialize()
    //    let result = await httpModel.update({
    //        url:'/api/position',
    //        data
    //    })
    // //    console.log(result)
    //    if(result.ret){
    //        $form[0].reset()
    //    }else{
    //        alert(result.data.message)
    //    }
    // })
    $form.ajaxForm({
        resetForm:true
    })
}

//修改跳转
function _updateClick(res){
    $("#router-view").on("click",".update-btn",function(){
        let id = $(this).attr('data-id')
        res.go('/position_update',{id})
    })
}

//修改数据功能
function  _updateForm(id,res){
    // $(".update-form-btn").on("click",async()=>{
    //    let $form = $(".form-horizontal")
    //    let data = $form.serialize() + '&id=' + id
    //     // console.log(data)

    //    let result = await httpModel.update({
    //        url:'/api/position',
    //        data,
    //        type:'patch'
    //    })
    // //    console.log(result)
    //    if(result.ret){
    //       res.go('/position')
    //    }else{
    //        alert(result.data.message)
    //    }
    // })
    $('.form-horizontal').ajaxForm({
        resetForm: true,
        dataType: 'json',
        url: '/api/position',
        type: 'patch',
        success: (result) => {
          if (result.ret) {
            res.go('/position')
          } else {
            alert(result.data.message)
          }
        }
      })
}

//删除数据
function _removeClick(res){
    $("#router-view").on("click",".delete-btn",async function(){
        let id = $(this).attr('data-id')
        let tempCompanyLogo = $(this).attr('data-img')
        console.log(this)
        let result = await httpModel.update({
            url:'/api/position',
            type:'delete',
            data:{
                id,
                tempCompanyLogo
            }
        })
        // console.log(result)
        if(result.ret){
            res.go('/position?t=' + Date.now())//自动渲染
        }
    })
}

//搜索功能

async function _handlSearch(res){
    let keywords = $('#search').val()
    let result = await httpModel.update({
        url:'/api/position/search',
        data:{
            keywords
        }
    })
    if(result.ret){
        res.render(positionListView({
            list : result.data.list
        }))
    }else{
        res.go('/position')
    }

}

function _searchEvent(res){
    $("#router-view").on("click",".search-btn",function(){       
        // console.log(keywords)
        _handlSearch(res)
    })
    $("#router-view").on("keyup","#search",(e)=>{       
        // console.log(keywords)
        if(e.keyCode === 13){
            _handlSearch(res)
        }
    })
}

//分页功能
// function _pagination(req,res,next){ 
//     $(".pagination a.pageNo").on("click", function(){
//         // list(req,res,next,$(this).text())
//         res.go("/position_list/"+$(this).text())
        
//     })
// }
function _paginationClick(req,res,obj,type,pageCount){
    if(type){
        let page = ~~req.params.page
        // console.log(type)
        if(type === "prev" && page > 1){
            console.log(page)
            res.go("/position_list/" + (page-1))
        }else if(type === "next" && page < pageCount.length){
            res.go("/position_list/" + (page+1))
        }
    }else{
        res.go("/position_list/"+ ~~$(obj).text())
    }
}


//第一次加载页面时 由路由调用list方法page不存在  之后执行_pagination调用page为点击的页码
export const list = async (req,res,next)=>{
    
    let currentPage = ~~req.params.page || 1

    let result = await httpModel.get({
        url:"/api/position",
        data:{
            start:(currentPage  - 1) * count,
            count
        }
    })
    // console.log(result)
    let pageCount = _.range(1,Math.ceil(result.data.total/count)+1) 
    // console.log(pageCount)
    if(result.ret){
        let {list} = result.data
        res.render(positionListView(
            {
                list,
                pageCount,
                currentPage
            }
        ))
       
    }else{
        alert("请先登录！！！！")
        res.go("/home")
    }
    //跳转修改页面功能
    _updateClick(res)
    //删除数据功能
    _removeClick(res)
    //搜索功能
    _searchEvent(res)
    //分页
    // _pagination(req,res,next)
    $(".pagination a.pageNo").on("click",function(){
        _paginationClick(req,res,this)
    })
    $(".pagination a.page-prev").on("click",function(){
        _paginationClick(req,res,this,"prev")
    })
    $(".pagination a.page-next").on("click",function(){
        _paginationClick(req,res,this,"next",pageCount)
    })

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
