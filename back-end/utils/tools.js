const bcrypt = require("bcrypt")
const fs = require("fs")
const jwt = require("jsonwebtoken")
const path = require("path")
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
//比较密码
const compare = (password,hash)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password, hash, function(err, res) {
            // res == true
            resolve(res)
        });
    })
}
//设置token

const generateToken = (username)=>{
    return new Promise((resolve,reject)=>{
        let cert = fs.readFileSync(path.resolve(__dirname,"../key/rsa_private_key.pem"))
        jwt.sign(
            {username},
            cert,
            {
                algorithm:'RS256'
            },
            (err,token)=>{
                resolve(token)
            }
        )
    })
}

//验证token
const verifyToken = (token)=>{
    return new Promise((resolve,reject)=>{
        let cert = fs.readFileSync(path.resolve(__dirname,"../key/rsa_public_key.pem"))
        jwt.verify(token,cert,(err,decoded)=>{
            resolve(decoded)
        })
    })
}

module.exports = {
    encrypt,
    compare,
    generateToken,
    verifyToken
}