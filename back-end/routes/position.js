var express  = require("express")

var router = express.Router()

var positions = require("../controllers/positions")

// router.get("/findAll", positions.findAll)

// router.post("/save",positions.save)

router.route('/')
    .get(positions.findAll)
    .post(positions.save)
    .patch(positions.update)
    .delete(positions.remove)

router.get('/findOne',positions.findOne)

        

module.exports = router