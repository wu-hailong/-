import listView from "../views/list.art"

export const list = (req,res,next)=>{
    res.render(listView())
}