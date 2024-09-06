const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true,
});

const StudentModel = mongoose.model("Student", studentSchema);

module.exports = StudentModel;
