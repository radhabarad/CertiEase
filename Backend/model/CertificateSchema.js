const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
    
    enrollmentNo: {
        type:Number,
        required: true,
        maxLength: 12,
        minLength: 12,
    },
    facultyId:{
        type: Number,
        //required: true,
        maxLength: 12,
    },
    adminID:{
        type: Number,
        //required: true,
        maxLength: 12,
        default: 333333333333
    },
    certificateName:{
        type: String,
        //required: true,
    },
    pdfPath: {
        type: String,
    },
    facultyStatus: {
        type: String,
        enum: ['Approved', 'Rejected', 'Pending'],
        default: 'Pending' // Default value set to 'pending'
    },
    AdminStatus:{
        type: String,
        enum: ['Approved', 'Rejected', 'Pending'],
        default: 'Pending' // Default value set to 'pending'
    },
    // message:{
    //     type: String,
    // },
    imageFile:{
        type:String
    }

})

module.exports = mongoose.model("Certificate",CertificateSchema);