const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/NodeJsDb', { useUnifiedTopology: true, useNewUrlParser: true });

const Users = mongoose.model('users', { 
    username:String,
    password:String
});

const Positions = mongoose.model('positions',{
    company:String,
    position:String,
    companySite:String,
    weeks:String,
    salary:String,
    createTime:String
})
module.exports = {
    Users,
    Positions
}