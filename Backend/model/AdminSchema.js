const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
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
    adminID:{
        type: Number,
        required: true,
        maxLength: 12,
    }
})

module.exports = mongoose.model("Admin",AdminSchema);