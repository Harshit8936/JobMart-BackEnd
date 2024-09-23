import {Company} from "../models/Company.js";


export const registerCompany = async(req,res)=>{
    try {
        const {name} = req.body;
        if(!name) {
            return res.status(400).json({
                message:"Company name is required",
                success:false
            })
        }
        let company = await Company.findOne({name}).exec();
        if(company){
            return res.status(400).json({
                message:"Company name alreday exist",
                success:false
            })
        }
        company = await Company.create({
            name,
            created_By:req.user_id
        })
        return res.status(201).json({
            message:"Company registered successfully",
            company,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error,
            success:false
        }) 
    }
}

export const getCompanies = async(req,res)=>{
    try {
        const user_id = req.user_id;
        const companies = await Company.find({created_By:user_id}).sort({createdAt:-1}).exec();
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Comapnies found",
            companies,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error,
            success:false
        })
    }
}

export const getCompanyById = async(req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId).exec();
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Comapny found",
            company,
            success:true
        }) 
    } catch (error) {
        return res.status(500).json({
            message:error,
            success:false
        })
    }
}

export const companyUpdate = async(req,res)=>{
    try {
        const {name,description,website,location,logo} = req.body;
        const file = req.file;
        const updateData = {name,description,website,location,logo};
        const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new:true}).exec();
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Company Updated",
            company,
            success:true
        }) 
    } catch (error) {
        return res.status(500).json({
            message:error,
            success:false
        })
    }
}