const mongoose = require('mongoose')

const mongoURI = "mongodb://localhost:27017/demo"

const connectDB=()=>{
    mongoose.connect(mongoURI).then((con)=>{
        console.log("Mongoose is connected");
    })
}

module.exports=connectDB