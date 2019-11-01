const path = require('path')

const multer = require('multer')

const randomstring = require('randomstring')

const fs = require("fs")

var filename = ''

const mimetypeMap = {
    'image/png' :'.png',
    'image/jpg' :'.jpg',
    'image/jpeg':'.jpeg',
    'image/git' :'.git',
} 

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null , path.resolve(__dirname, '../public/uploads'))
    },
    filename:(req,file,cb)=>{
        let { fieldname , mimetype } = file
        filename = fieldname + '-' + randomstring.generate(6) + mimetypeMap[mimetype]
        cb(null,filename)
    }
})

const upload = multer({
    storage
}).single('companyLogo')

module.exports = (req,res,next)=>{
    upload(req,res,(err)=>{
        // console.log(filename)
        if(filename){
            fs.unlink(path.resolve(__dirname,"../public/uploads/" + req.body.tempCompanyLogo) , (err)=>{
                if(err){
                    console.log(err.message)
                }
            })
        } 
        req.filename = filename
        filename = ''
        next()
    })
}