const bcrypt = require("bcrypt");
const Student = require("../model/StudentSchema");
const jwt = require("jsonwebtoken");
const { user } = require("../routes/user");
require("dotenv").config();

//signup route handler
exports.StudentSignup = async(req,res) =>{
    try{
        //get data
        const{name,email,mobileNo,sem,branch,password,enrollmentNo,DOB} = req.body;

        //check if user already exist or not
        const existingUser = await Student.findOne({enrollmentNo});
        //if valid entry the....
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'User already exist',
            });
        }

        //secure the password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10)
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: 'Error in hashing password',
            });
        }

        //create entry for User
        const user = await Student.create({
            name, email, password:hashedPassword, mobileNo,sem,branch,enrollmentNo,DOB
        });

        return res.status(200).json({
                success: true,
                message: 'User created successfully',
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'User can not registered, please try again later ',
        });
    }
}

//login handler

exports.StudentLogin = async (req,res)=> {
    try{
        //fetch data
        const {enrollmentNo, password} = req.body;
console.log(req.body)
        //validation on email and pwd
        if(!enrollmentNo || !password){
            return res.status(400).json({
                success: false,
                message: 'Please fill the detail carefully',
            });
        }

        //check the registered user
        let user = await Student.findOne({enrollmentNo});
        console.log({user});
        //if not a registered user
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Please register youeself first',
            });
        }

        const payload = {
            enrollmentNo: user.enrollmentNo,
            id: user._id,
        };
        //verify pwd and generate jwt token
        if(await bcrypt.compare(password, user.password)){
            //pwd match create token
            let token = jwt.sign(payload,
                                process.env.JWT_SECRET,
                                {
                                    expiresIn: "12h",
                                } );
            //console.log(user) 
            user = user.toObject();            
            user.token = token;
            user.password = undefined;
            //console.log(user)

            const options = {
                expiresIn: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            };

            //creating a cookie
            res.cookie("mycookie", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "logged in suucessfully"
            })
        }
        else{
            //pwd not matched
            return res.status(403).json({
                success: false,
                message: 'Password incorrect',
            });
        }
    }
    catch(error){
        console.log("error",error)
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Loggin failure',
        });
    }
}