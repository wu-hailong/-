import SMErouter from "sme-router"

import {home} from "../controllers/home" 
import {list} from "../controllers/list" 

const router = new SMErouter("router-view")
router.use((req)=>{
    let url = req.url.slice(1)
    // console.log(url)
    $(".sidebar-menu a").removeClass("active")
    $(`.sidebar-menu a[data-url=${url}]`).addClass("active")
})
// console.log(router)
router.route("/home",home)
router.route("/list",list)
router.route('*', (req, res, next) => {
    res.redirect('/home')
  })
export default router