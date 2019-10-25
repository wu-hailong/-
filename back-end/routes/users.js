var express = require('express');
var router = express.Router();
var { signup , hasSame , signin } = require("../controllers/users")
/* POST users listing. */
router.post('/signup', hasSame , signup );
router.post('/signin', signin )
module.exports = router;
