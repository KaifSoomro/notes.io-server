const userSchema = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secreteKey = "10**&%$#@ahsajsa3837snsak*&%$#@skaiw483920akj**&%$#$#ssnd";

const registration = async( req, res ) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(404).json({
                message: "Please enter the values first"
            })
        }

        const existingEmail = await userSchema.findOne({ email });

        if(existingEmail){
            return res.status(400).json({
                message: "User already exists."
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await userSchema({ name, email, password:hashPassword});
        await newUser.save();

        res.status(200).json({
            message: "Registration Successfull.",
            newUser
        })
    } catch (error) {
        return res.status(400).json({
            message:"Registration failed"
        })
    }
}

const login = async( req, res ) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(404).json({
                message: "Please enter the values first"
            })
        }

        const user = await userSchema.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        const token = jwt.sign({id:user._id , email:user.email}, secreteKey, { expiresIn:"1hr" })
        
        res.status(200).json({message:"Login successfull.", token:token})
    } catch (error) {
        return res.status(400).json({
            message:"Login failed"
        })
    }
}

const profile = async(req,res) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];

        if(!token) return res.status(400).json({message:"Access Denied"});

        jwt.verify(token, secreteKey, async(err,decode)=>{
            const user = await userSchema.findById(decode?.id);

            if(!user){
                return res.status(400).json({message:"Invalid Token"}) 
            }

            const userData = {
                id:user?.id,
                name:user?.name,
                email:user?.email
            }

            return res.status(200).json({message:"profile data",data:userData}) 
        })
    } catch (error) {
        return res.status(400).json({message:"Something went wrong.",error}) 
    }
}

module.exports = {
    registration,
    login,
    profile
};