const bcrypt = require("bcrypt")

//密码加密
const encrypt = (password)=>{
   return new Promise((resolve,reject)=>{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            resolve(hash)
        });
    });
   })
}

const compare = (password,hash)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password, hash, function(err, res) {
            // res == true
            resolve(res)
        });
    })
}
module.exports = {
    encrypt,
    compare
}