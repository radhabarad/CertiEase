const Certificate = require("../model/CertificateSchema")
const { allroutes } = require("../routes/user");

exports.facultyApproveCertificate = async(req,res)=>{
    try{
        const {enrollmentNo,certificateName} = req.body;

        const filter = { enrollmentNo: enrollmentNo,certificateName:certificateName,facultyStatus:"Pending" };
        const update = {facultyStatus:"Approved"};

        let doc = await Certificate.findOneAndUpdate(filter,update,{new:true});
        console.log(doc);
        res.status(200).json({
            success:true,
            messgae:"faculty Approved certificate"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:true,
            message:"internal error while faculty Approves the certificate"
        })
        
    }
}

exports.facultyRejectCertificate = async(req,res)=>{
    try{
        const {enrollmentNo,certificateName} = req.body;

        const filter = { enrollmentNo: enrollmentNo,certificateName:certificateName,facultyStatus:"Pending" };
        const update = {facultyStatus:"Rejected",AdminStatus:"Rejected"};

        let doc = await Certificate.findOneAndUpdate(filter,update,{new:true});
        console.log(doc);
        res.status(200).json({
            success:true,
            messgae:"faculty Rejected certificate"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"internal error while faculty rejects the certificate"
        })   
    }
}

exports.admApproveCertificate = async(req,res)=>{
    try{
        console.log("helo");
        const {enrollmentNo,certificateName} = req.body;

        const filter = { enrollmentNo: enrollmentNo,certificateName:certificateName,facultyStatus:"Approved",AdminStatus:"Pending" };
        const update = {AdminStatus:"Approved"};

        let doc = await Certificate.findOneAndUpdate(filter,update,{new:true});
        console.log(doc);
        if({AdminStatus:"Approved"}){
            // res.status(200).json({
            //     success:true,
            //     messgae:"administrative approved certificate"
            // })
            console.log("administrative approved certificate");
                const requestBody = req.body;
                if (certificateName === 'Bonafide') {
                    // Call processCertificate with request body
                    await addStampAndSignatureBonafide(requestBody, res);
                } else if (certificateName === 'Character') {
                    await addStampAndSignatureCharacter(requestBody, res);
                } else {
                    console.log("no certificate type present");
                }                
        }
        else{
            res.status(400).jason({
                success:false,
                message:"administrative  could not approve the certificate"
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:true,
            message:"internal error while administrative approve the certificate"
        })
        
    }
}
exports.admRejectCertificate = async(req,res)=>{
    try{
        const {enrollmentNo,certificateName} = req.body;

        const filter = { enrollmentNo: enrollmentNo,certificateName:certificateName,facultyStatus:"Approved",AdminStatus:"Pending" };
        const update = {AdminStatus:"Rejected"};

        let doc = await Certificate.findOneAndUpdate(filter,update,{new:true});
        console.log(doc);
        res.status(200).json({
            success:true,
            messgae:"administrative Rejected certificate"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:true,
            message:"internal error while administrative Rejects the certificate"
        })
        
    }
}



const fs = require("fs").promises;
const { PDFDocument, rgb } = require("pdf-lib");
const { createCanvas, loadImage } = require("canvas");

async function convertImageToPng(inputPath, outputPath) {
  const image = await loadImage(inputPath);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, image.width, image.height);
  const buffer = canvas.toBuffer("image/png");
  await fs.writeFile(outputPath, buffer);
}

async function addStampAndSignatureBonafide(requestBody, res) {
  try {
    
    const {enrollmentNo, certificateName} = requestBody;

    // Convert stamp image to PNG format
    await convertImageToPng("./images/fianl-stamp.jpg", "stamp.png");
    // Convert signature image to PNG format
    //await convertImageToPng("signature.jpeg", "signature.png");

    // Load existing PDF
    const pdfBytes = await fs.readFile(`./documents/${enrollmentNo}_${certificateName}.pdf`);
    const existingPdfDoc = await PDFDocument.load(pdfBytes);
    const pages = existingPdfDoc.getPages();

    // Get the first page of the existing PDF
    const firstPage = pages[0];

    // Add stamp image
    const stampContent = await fs.readFile("stamp.png");
    const stampImage = await existingPdfDoc.embedPng(stampContent);
    const stampDims = stampImage.scale(0.07); // Adjust scale as needed
    const stampWidth = stampDims.width;
    const stampHeight = stampDims.height;
    // Define stamp position
    const stampX = 420; // Adjust X position as needed
    const stampY = 183; // Adjust Y position as needed
    // Draw stamp on the first page
    firstPage.drawImage(stampImage, {
      x: stampX,
      y: stampY,
      width: stampWidth,
      height: stampHeight,
    });

    // Add signature image
    const signatureContent = await fs.readFile("./images/sign.png");
    const signatureImage = await existingPdfDoc.embedPng(signatureContent);
    const signatureDims = signatureImage.scale(0.03); // Adjust scale as needed
    const signatureWidth = signatureDims.width;
    const signatureHeight = signatureDims.height;
    // Define signature position
    const signatureX = 407; // Adjust X position as needed
    const signatureY = 245; // Adjust Y position as needed 125(overlap)
    // Draw signature on the first page
    firstPage.drawImage(signatureImage, {
      x: signatureX,
      y: signatureY,
      width: signatureWidth,
      height: signatureHeight,
    });

    // Save modified PDF
    const modifiedPdfBytes = await existingPdfDoc.save();
    await fs.writeFile(`./documents/${enrollmentNo}_${certificateName}.pdf`, modifiedPdfBytes);
    console.log("Stamp and signature added successfully!");

    const pdfPath = `./documents/${String(enrollmentNo).replace(/\s/g, '_')}_${certificateName}.pdf`;

    res.status(200).json({
                        success: true,
                        message: `${enrollmentNo} approved PDF generated, and path saved`,
                        pdfPath: pdfPath
                    });

  } catch (error) {
    console.error("Error adding stamp and signature:", error);
    res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                    error: err.message
                });
  }
}

// const enrollmentNo = "210210107072"; // Replace with actual enrollment number
// addStampAndSignature(enrollmentNo);


async function addStampAndSignatureCharacter(requestBody, res) {
    try {
      
      const {enrollmentNo, certificateName} = requestBody;
  
      // Convert stamp image to PNG format
      await convertImageToPng("./images/fianl-stamp.jpg", "stamp.png");
      // Convert signature image to PNG format
      //await convertImageToPng("signature.jpeg", "signature.png");
  
      // Load existing PDF
      const pdfBytes = await fs.readFile(`./documents/${enrollmentNo}_${certificateName}.pdf`);
      const existingPdfDoc = await PDFDocument.load(pdfBytes);
      const pages = existingPdfDoc.getPages();
  
      // Get the first page of the existing PDF
      const firstPage = pages[0];
  
      // Add stamp image
      const stampContent = await fs.readFile("stamp.png");
      const stampImage = await existingPdfDoc.embedPng(stampContent);
      const stampDims = stampImage.scale(0.07); // Adjust scale as needed
      const stampWidth = stampDims.width;
      const stampHeight = stampDims.height;
      // Define stamp position
      const stampX = 428; // Adjust X position as needed
      const stampY = 95; // Adjust Y position as needed
      // Draw stamp on the first page
      firstPage.drawImage(stampImage, {
        x: stampX,
        y: stampY,
        width: stampWidth,
        height: stampHeight,
      });
  
      // Add signature image
      const signatureContent = await fs.readFile("./images/sign.png");
      const signatureImage = await existingPdfDoc.embedPng(signatureContent);
      const signatureDims = signatureImage.scale(0.03); // Adjust scale as needed
      const signatureWidth = signatureDims.width;
      const signatureHeight = signatureDims.height;
      // Define signature position
      const signatureX = 415; // Adjust X position as needed
      const signatureY = 160; // Adjust Y position as needed 125(overlap)
      // Draw signature on the first page
      firstPage.drawImage(signatureImage, {
        x: signatureX,
        y: signatureY,
        width: signatureWidth,
        height: signatureHeight,
      });
  
      // Save modified PDF
      const modifiedPdfBytes = await existingPdfDoc.save();
      await fs.writeFile(`./documents/${enrollmentNo}_${certificateName}.pdf`, modifiedPdfBytes);
      console.log("Stamp and signature added successfully!");
  
      const pdfPath = `./documents/${String(enrollmentNo).replace(/\s/g, '_')}_${certificateName}.pdf`;
  
      res.status(200).json({
                          success: true,
                          message: `${enrollmentNo} approved PDF generated, and path saved`,
                          pdfPath: pdfPath
                      });
  
    } catch (error) {
      console.error("Error adding stamp and signature:", error);
      res.status(500).json({
                      success: false,
                      message: 'Internal server error',
                      error: err.message
                  });
    }
}




