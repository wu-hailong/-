var express  = require("express")

var router = express.Router()

var positions = require("../controllers/positions")

var uploadMiddleware = require("../middlewares/upload")
// router.get("/findAll", positions.findAll)

// router.post("/save",positions.save)

router.route('/')
    .get(positions.findAll)
    .post(uploadMiddleware,positions.save)
    .patch(uploadMiddleware,positions.update)
    .delete(positions.remove)

router.get('/findOne',positions.findOne)
router.post('/search',positions.search)

        

module.exports = router