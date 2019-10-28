var express = require('express');
var router = express.Router();
var { signup , hasSame , signin , isSignin , signout } = require("../controllers/users")
/* POST users listing. */
router.post('/signup', hasSame , signup );
router.post('/signin', signin );
/* get users listing. */
router.get('/isSignin',isSignin);
router.get('/signout',signout);
module.exports = router;
