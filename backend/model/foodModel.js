const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    id:String,
    food_name:String,
    cost:String,
    description:String
})

const foodModel = mongoose.model('Foods',foodSchema)
module.exports=foodModel