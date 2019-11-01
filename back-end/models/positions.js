const { Positions } = require("../utils/db")

const save = (data) => {
    let positions = new Positions(data)
    return positions.save()
}

const findAll = async ({start,count})=>{
    let list = await Positions.find({}).sort({_id:-1}).limit(~~count).skip(~~start)
    let total = await Positions.find({}).count()
    return {
        list,
        total
    }
}

const findOne = async (id)=>{
    return await Positions.findById(id)
}

const update = async (data)=>{
    return await Positions.findByIdAndUpdate(data.id,data)
}

const remove = async (id)=>{
    return await Positions.findByIdAndRemove(id)
}

const search = async  (keywords)=>{
    let reg = new RegExp(keywords,"gi")
    return await Positions.find({}).or([{company:reg},{position:reg}])
}
module.exports = {
    save,
    findAll,
    findOne,
    update,
    remove,
    search
}