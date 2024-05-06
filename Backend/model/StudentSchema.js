const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
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
    mobileNo:{
        type:Number,
        required: true,
        maxLength: 10,
        minLength: 10,
    },
    sem:{
        type:Number,
        required: true,
    },
    branch:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    enrollmentNo: {
        type:Number,
        required: true,
        maxLength: 12,
        minLength: 12,
    },
    DOB: {
        type:Date,
        required:true,
    }
    // Caste: {
    //     type:String,
    //     required:true,
    // },
    // AdmittedCaste : {
    //     type:String,
    //     required:true,
    // },
    // photo:{
    //     type:Image,
    //     required: true,
    // }
})

module.exports = mongoose.model("Student",StudentSchema);