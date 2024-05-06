const puppeteer = require('puppeteer');
const User = require("../model/StudentSchema");
const Certificate = require("../model/CertificateSchema");
const fs = require('fs');
const path = require('path');

exports.characterCertificate = async (req, res) => {
    try {
        // Check if file was successfully uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        console.log("image stored");
        // Store request body
        const requestBody = req.body;

        // Call processCertificate with request body
        await processCertificate(req.file, requestBody, res);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

async function processCertificate(file, requestBody, res) {
    try {
        console.log({requestBody});
        // console.log(typeof(requestBody.enrollmentNo));
        // console.log(typeof(requestBody.sem));
        // console.log(typeof(requestBody.name));
        // console.log(typeof(requestBody.year));
        // console.log(typeof(requestBody.branch));
        // console.log(typeof(requestBody.facultyId));
        // console.log(typeof(requestBody.certificateName));

        const {name, enrollmentNo, sem, year, branch, facultyId, certificateName} = requestBody;

        if (!name || !enrollmentNo || !sem || !year || !branch || !facultyId || !certificateName) {
            return res.status(400).json({
                success: false,
                message: "Name, enrollment number, semester, year, branch, and image file are required fields",
            });
        }

        const fileType = path.extname(file.originalname).slice(1); // Remove the dot from the extension

        console.log({fileType});
        // Read HTML template
        const html = fs.readFileSync('./Character.html', 'utf8');

       // Get current date
const currentDate = new Date();

// Format date to dd/mm/yyyy
const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

// Add formatted date to mapobj
const mapobj = {
    '{{name}}': name,
    '{{enrollmentNo}}': enrollmentNo,
    '{{sem}}': sem,
    '{{year}}': year,
    '{{branch}}': branch,
    '{{imageUrlsIs}}': `http://localhost:3000/images/${enrollmentNo}_image.${fileType}`,
    '{{fileType}}': fileType,
    '{{date}}': formattedDate
}; 

        //console.log({imageUrlsIs});
        // Replace placeholders in HTML template with data
        const replacedHtml = html.replace(/{{name}}|{{enrollmentNo}}|{{sem}}|{{year}}|{{branch}}|{{imageUrlsIs}}|{{fileType}}|{{date}}/gi, (matched) => {
            return mapobj[matched];
        });
        //console.log("Replaced HTML:", replacedHtml); // Add this line to log the replaced HTML content

        //console.log("hello")
        // Launch Puppeteer browser
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set the content of the page
        await page.setContent(replacedHtml);

        // Set the PDF options
        const pdfPath = `./documents/${String(enrollmentNo).replace(/\s/g, '_')}_${certificateName}.pdf`;

        const options = {
            path: pdfPath,
            format: 'A4',
        };

        // Generate the PDF
        await page.pdf(options);

        // Close browser after generating PDF
        await browser.close();

        // Save certificate details into the database
        const certificate = new Certificate({
                        //userId: data._id, // Assuming userId corresponds to the User model
                        enrollmentNo: enrollmentNo,
                        facultyId:  facultyId,
                        pdfPath: pdfPath,
                        certificateName: certificateName,
                        });
        await certificate.save();

        res.status(200).json({
            success: true,
            message: `${enrollmentNo} data successfully fetched, PDF generated, and path saved`,
            data: { name, enrollmentNo, sem, year, branch },
            pdfPath: pdfPath
        });
        console.log("bonafide certificate generated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
}

