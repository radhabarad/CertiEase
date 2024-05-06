const Certificate = require("../model/CertificateSchema");

exports.getPendingCertificatesForFaculty = async (req, res) => {
    try {
        const { facultyId } = req.body;
        //console.log(typeof(facultyId));
        
        if(facultyId === 333333333333 || facultyId === 111111111111){
            const pendingCertificates = await Certificate.find({
                adminID: facultyId,
                facultyStatus:'Approved',
                AdminStatus: 'Pending'
            });
            //console.log("hello3");
            res.status(200).json({
                success: true,
                pendingCertificates: pendingCertificates
            });
            // console.log({pendingCertificates});


        }else{
            // Find pending certificate requests for the given facultyId
            const pendingCertificates = await Certificate.find({
                facultyId: facultyId,
                facultyStatus: "Pending",
                AdminStatus: 'Pending'
            });
            //console.log("hello2");
            res.status(200).json({
                success: true,
                pendingCertificates: pendingCertificates
            });
            console.log({pendingCertificates});
        }

        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
};