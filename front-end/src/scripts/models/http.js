export default {
    get({url,type="GET",data={}}){

       return $.ajax({
            url ,
            type,
            data,
            success: (result,textStatus,jqXHR)=>{
                return result
            }
          })
    },
    update({url,type="POST",data={}}){
        return $.ajax({
            url,
            type,
            data,
            success(result){
                return result
            }
        })
    }
}