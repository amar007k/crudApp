const express = require('express');
const cors = require('cors');
const connectDB = require('./connectDB/connectDB.js');
const StudentModel = require('./models/StudentModel.js'); // Adjust the path as necessary


const app = express();
app.use(cors())
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 8080

       StudentModel();


const startServer = async()=>{
    try{
        //connected to database
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`server is running at http://localhost:${PORT}`);
        });

    }catch(error){
        console.error("Error connecting to the database:", error);
        }
}

//start the server
startServer();

//read
app.get("/", async(req,res)=>{
    const data = await StudentModel.find({})

    res.json({
        success: true, data:data
    })
});


//create data / save data at mongodb

app.post("/create",async(req,res)=>{
    try{
        const student = new StudentModel(req.body)
        const savedStudent = await student.save();
        console.log("Saved student:", savedStudent);
        res.status(201).json({
            success: true,
            message: "Data saved successfully",
            data: savedStudent
        });

    }catch(error){
        res.status(400).json({
            success: false,
            message: "Error saving data to the database",
            error: error.message
        });
    }
});

//update data at database

app.put("/update", async(req,res)=>{

    console.log(req.body)
    const {_id,...rest} = req.body

    console.log(rest)
    const data = await StudentModel.updateOne({_id: _id},rest)
    res.send({success:true,message:"data is updated successfully", data:data})
});


//delete the data from database

app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const deletedStudent = await StudentModel.deleteOne({_id: id })
    res.send({success:true,message:"data is delete successfully", deletedStudent})
});