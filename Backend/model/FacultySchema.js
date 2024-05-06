const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,    
    },
    email:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    facultyId:{
        type: Number,
        required: true,
        maxLength: 12,
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    qualification: {
        type: Array,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    course: {
        type: Array,
        required: true,
    },
    areaofinterest: {
        type: Array,
        required: true,
    },
    designation: {
        type: Array,
        required: true,
    },
    publications: {
        type: Array,
        required: true,
    }

})

module.exports = mongoose.model("Faculty",FacultySchema);