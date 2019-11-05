import positionListView from "../views/position.art"
import positionAddView from "../views/position.add.art"
import positionUpdateView from "../views/position.update.art"
import httpModel from "../models/http"
import _ from "lodash"

let count = 5

//返回按钮点击事件

function _back(res){
    $(".back-btn").on("click",()=>{
        res.back()
    })
}

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
            // res.go('/position')
            //修改完成后 跳回之前的分页
            res.back()
          } else {
            alert(result.data.message)
          }
        }
      })
}

//删除数据
function _removeClick(req,res){
    $(".delete-btn").on("click",async function(){
        let id = $(this).attr('data-id')
        let tempCompanyLogo = $(this).attr('data-img')
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
            res.go('/position_list/' + (req.params.page || 1) +"?"+ Date.now())//自动渲染
        }
    })
}

//搜索功能

async function _handlSearch(req,res){
    let keywords = $('#search').val()
    if(keywords === ""){
        res.go("/position_list/1" +"?t="+ Date.now())  
        return 
    }
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
        
        _removeClick(req,res)
        _searchEvent(req,res)
    }

}

function _searchEvent(req,res){
    // $("#router-view").on("click",".search-btn",function(){       
    //     // console.log(keywords)
    //     _handlSearch(req,res)
    // })
    // $("#router-view").on("keyup","#search",(e)=>{       
    //     // console.log(keywords)
    //     if(e.keyCode === 13){
    //         _handlSearch(req,res)
    //     }
    // })
    $(".search-btn").on("click",function(){       
        // console.log(keywords)
        _handlSearch(req,res)
    })
    $("#search").on("keyup",(e)=>{       
        // console.log(keywords)
        if(e.keyCode === 13){
            _handlSearch(req,res)
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
            // console.log(page)
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
    //
    if(result.ret && result.data.list.length === 0 && currentPage > 1){
        res.go("/position_list/" + (currentPage - 1))
        return
    }
    // console.log(result)
    let pageCount = _.range(1,Math.ceil(result.data.total/count)+1) 
    if(result.ret){
        let {list} = result.data
        res.render(positionListView(
            {
                list,
                pageCount,
                currentPage,
                from:"list",
                total:result.data.total,
                count
            }
        ))
       
    }else{
        alert("请先登录！！！！")
        res.go("/home")
    }
    //跳转修改页面功能
    _updateClick(res)
    //删除数据功能
    _removeClick(req,res)
    //搜索功能
    _searchEvent(req,res)
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
    _back(res)
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
    _back(res)
    // 修改数据功能
    _updateForm(id,res)
    
}
