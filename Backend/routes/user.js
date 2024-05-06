const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images'); // Set your destination folder here
    },
    filename: (req, file, cb) => {
        const enrollmentNo = req.body.enrollmentNo || 'unknown';
        const originalExtension = path.extname(file.originalname);
        console.log({originalExtension});
        const filename = `${enrollmentNo}_image${originalExtension}`;
        console.log({filename});
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });
const controller = require('../controllers/BonafideCertificate');
const controller1 = require("../controllers/CharacterCertificate");

router.post('/bonafide-pdf', upload.single('imageFile'), controller.bonafideCertificate);
router.post('/character-pdf', upload.single('imageFile'), controller1.characterCertificate);


const {FacultySignup,FacultyLogin} = require("../controllers/FacultyController");
const {StudentSignup, StudentLogin} = require("../controllers/StudentController");
const {AdminSignup,AdminLogin} = require("../controllers/AdminController");
//const {bonafideCertificate} = require("../controllers/BonafideCertificate");
const {getPendingCertificatesForFaculty} = require("../controllers/getPendingCertificatesForFaculty");
const  {viewPdf} = require("../controllers/ViewPdf");
const {facultyApproveCertificate, facultyRejectCertificate, admApproveCertificate, admRejectCertificate} = require("../controllers/ApproveAndReject");
const {getAllApprovedCertificate, getPerticularApprovedCertificate} = require("../controllers/getApprovedCertificate");


router.post("/faculty/signup", FacultySignup);
router.post("/faculty/login", FacultyLogin);
router.post("/student/signup", StudentSignup);
router.post("/student/login", StudentLogin);
router.post("/admin/signup", AdminSignup);
router.post("/admin/login", AdminLogin);
//router.post("/bonafide-pdf",bonafideCertificate);
router.post("/faculty-pendingview", getPendingCertificatesForFaculty);
router.post("/viewpdf",viewPdf);
router.post("/faculty-aproved",facultyApproveCertificate);
router.post("/faculty-rejected",facultyRejectCertificate);
router.post("/adm-rejected", admRejectCertificate);
router.post("/adm-approved/bonafide",admApproveCertificate);
router.post("/getallapproved-student",getAllApprovedCertificate);
router.post("/viewCertificate-student",getPerticularApprovedCertificate);


module.exports = router;