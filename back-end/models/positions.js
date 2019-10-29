const { Positions } = require("../utils/db")

const save = (data) => {
    let positions = new Positions(data)
    return positions.save()
}

module.exports = {
    save
}