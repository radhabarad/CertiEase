const Certificate = require("../model/CertificateSchema");
const fs = require('fs');
const path = require('path');

exports.viewPdf = async (req, res) => {
    const fileName = `${req.body.enrollmentNo}_${req.body.certificateName}.pdf`;
    console.log(fileName);

    const filePath = "../documents/" + fileName; // Relative path without __dirname
    console.log("name:", fileName);
    console.log("path:", filePath);

    // Construct absolute file path
    const absolutePath = path.resolve(__dirname, filePath);
    console.log("Absolute path:", absolutePath);

    // Check if file exists
    if (!fs.existsSync(absolutePath)) {
        console.log("File does not exist at:", absolutePath);
        return res.status(404).send('File not found.');
    }
    console.log("File found at:", absolutePath);

    // Set Content-Disposition header
    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);

    // Set Content-Type header
    res.setHeader('Content-Type', 'application/octet-stream');

    // Provide the file for download
    res.download(absolutePath, fileName, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to download PDF file.');
        }
    });
};
