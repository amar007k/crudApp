const mongoose = require('mongoose');


const connectDB = async()=>{
    const connect = await mongoose.connect("mongodb://localhost:27017/studentDB")
    if(connect){
        console.log("connected to database successfully..")
    }else{
        console.log("failed to connect database")
    }
};

module.exports = connectDB;

