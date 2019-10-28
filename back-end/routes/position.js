var express  = require("express")

var router = express.Router()

var position = require("../controllers/position")

router.get("/findAll", position.findAll)

module.exports = router