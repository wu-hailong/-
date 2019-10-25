export default {
    get({url,type="GET",data={}}){
       return $.ajax({
            url : url,
            type: type,
            data,
            success: (result)=>{
                return result
            }
          })
    }
}