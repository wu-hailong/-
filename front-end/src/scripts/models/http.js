import store from "store"
export default {
    get({url,type="GET",data={}}){
        let token = store.get("token")
       return $.ajax({
            url : url,
            type: type,
            data,
            success: (result,textStatus,jqXHR)=>{
                return result
            }
          })
    }
}