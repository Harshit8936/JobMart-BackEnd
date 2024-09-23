import { Job } from "../models/Job.js";


export const postJob = async(req,res)=>{
    try {
        const {title,description,skills,salary,experience,location,jobType,positions,company_id} = req.body;
    if(!title || !description || !skills || !salary || !experience || !location || !jobType || !positions || !company_id){
        return res.status(400).json({
            message:"Some fields are missed",
            success:false
        })
    }
    const job = await Job.create({
        title,
        description,
        skills:skills.split(","),
        salary:parseInt(salary),
        experience:parseInt(experience),
        location,
        jobType,
        positions:parseInt(positions),
        company_id,
        createdBy:req.user_id,
    })
    return res.status(201).json({
        message:"Job posted !",
        success:true,
        job
    })
    } catch (error) {
        return res.status(500).json({
            message:`${error}`,
            success:false
        })
    }
}


// jobs for students
export const getAllJobs = async(req,res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}}
            ]
        }
        const jobs = await Job.find(query).populate({path:'company_id'}).sort({createdAt:-1}).exec();
        if(!jobs){
            return res.status(404).json({
                message:"No jobs found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Jobs found",
            success:true,
            jobs
        })
    } catch (error) {
        return res.status(500).json({
            message:`${error}`,
            success:false
        })
    }
}

// 
export const getJobById = async(req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({path:'company_id'}).populate({
            path:'applications'
        }).exec();
        if(!job){
            return res.status(404).json({
                message:"No job found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Jobs found",
            success:true,
            job
        })
    } catch (error) {
        return res.status(500).json({
            message:`${error}`,
            success:false
        })
    }
}

// get jobs for recruiters and created by them

export const getAdminJobs = async(req,res)=>{
    try {
        const userId = req.user_id;
        const jobs = await Job.find({createdBy:userId}).populate({path:'company_id'}).sort({createdAt:-1}).exec();
        if(!jobs.length){
            return res.status(404).json({
                message:"No jobs found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Jobs found",
            success:true,
            jobs
        })
    } catch (error) {
        return res.status(500).json({
            message:`${error}`,
            success:false
        })
    }
}
