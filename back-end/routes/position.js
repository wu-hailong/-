var express  = require("express")

var router = express.Router()

var positions = require("../controllers/positions")

router.get("/findAll", positions.findAll)

router.post("/save",positions.save)

module.exports = router