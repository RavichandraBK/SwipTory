const mong = require('mongoose');

const Story = mong.model('Story',{
    heading:{
        type:String,
        required:true,
    },
    description:{type:String,},
    image:{type:String, required:true,},
    category:{type:String, enum:['food','health and movies','travel','movies','education'], required:true},
})

module.exports = Story;