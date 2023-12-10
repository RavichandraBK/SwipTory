const mong = require('mongoose');

const User = mong.model('User',{
    username:String,
    password:String,
})

module.exports = User;