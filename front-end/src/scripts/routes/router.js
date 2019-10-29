import SMErouter from "sme-router"

import {home} from "../controllers/home" 
import * as position from "../controllers/position" 

const router = new SMErouter("router-view")
router.use((req)=>{
    let url = req.url.slice(1).split("?")[0].split('_')[0]
    // console.log(url)
    $(".sidebar-menu a").removeClass("active")
    $(`.sidebar-menu a[data-url=${url}]`).addClass("active")
})
// console.log(router)
router.route("/home",home)
router.route("/position",position.list)
router.route("/position_add",position.add)
router.route("/position_update",position.update)

router.route('*', (req, res, next) => {
    res.redirect('/home')
  })
export default router