
import {User} from "../models/User.js" 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


export const register = async(req,res)=>{
    try {
        // req.files for multiple
        // const file = req.file;
        // console.log(file)
        // if(!file){
        //     return res.status(400).send({message:"File not uploaded"})
        // }
        const {fullname,email,phone,password,role} = req.body;
        if(!fullname || !email || !phone || !password || !role){
            return res.status(400).json({
                message:`Some filled are missed`,
                success:false
            }) 
        }
        const user = await User.findOne({email:email});
        if(user){
            return res.status(400).json({
                message:`User alreday exist`,
                success:false
            }) 
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            phone,
            password:hashedPassword,
            role,
            // profile:{profilePhoto:file.location}
        });
        return res.status(201).json({
                message:`User Register successfully`,
                success:true
        })  
    } catch (error) {
        return res.status(500).json({
            message:error,
            success:false
        })   
    }
}


export const login = async(req,res)=>{
    try {
        const {email,password,role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:`Some filled are missed`,
                success:false
            }) 
        }
        let user = await User.findOne({email}).exec();
        if(!user){
            return res.status(400).json({
                message:`Incorrect email or password`,
                success:false
            }) 
        }
        const isPasswordmatch = await bcrypt.compare(password,user.password);
        if(!isPasswordmatch){
            return res.status(400).json({
                message:`Incorrect email or password`,
                success:false
            }) 
        }
        if(role !== user.role){
            return res.status(400).json({
                message:`User doesn't exist for current role`,
                success:false
            }) 
        }
        const tokenData = {
            user_id:user._id,
            role:user.role
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1d"});
        user = {
            _id:user._id,
            fullname:user.fullname,
            phone:user.phone,
            role:user.role,
            email:user.email,
            profile:user.profile
        }
        // below token config for hacker
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true, sameSite:'strict'}).json({
            message:`Welcome back ${user.fullname}`,
            token,
            user,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error,
            success:false
        }) 
    }
} 

export const logout = async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logout successfully",
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error,
            success:false
        }) 
    }

}


export const updateProfile = async(req,res)=>{
    try {
        const {fullname, email, phone, bio, skills} = req.body;
        // req.files for multiple
        // const file = req.file;
        // console.log(file)
        // if(!file){
        //     return res.status(400).send({message:"File not uploaded"})
        // }
        let skillArray;
        if(skills){
            skillArray = skills.split(",");
        }
        const user_id = req.user_id;
        let user = await User.findById(user_id);
        if(!user){
            return res.status(404).json({
                message:`User not found`,
                success:false
            })
        }
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phone)  user.phone = phone;
        if(bio) user.profile.bio = bio;
        if(skills)  user.profile.skills = skillArray;
        // if(file) user.profile.resume = file.location;

        // resume comes later


        await user.save();
        user = {
            _id:user._id,
            fullname:user.fullname,
            phone:user.phone,
            email:user.email,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).json({
            message:`Profile updated`,
            user,
            success:true
        })

    } catch (error) {
        return res.status(500).json({
            message:error,
            success:false
        }) 
    }

}