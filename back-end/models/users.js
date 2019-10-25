const { Users } = require("..//utils/db")

const save = (data)=>{
    let users = new Users(data)

    return  users.save()
}
const findOne = (target)=>{
    return Users.findOne(target)
}

module.exports = {
    save,
    findOne
}
