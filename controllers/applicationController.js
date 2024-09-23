import {Application} from "../models/Application.js";
import {Job} from "../models/Job.js"

export const applyJob = async(req,res)=>{
    try {
        const userId = req.user_id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"Job Id Missing",
                succes:false
            })
        }

        // check if the user alreday applied the job
        const checkApplicationExist = await Application.findOne({job_id:jobId,applicant_user_id:userId}).exec();
        if(checkApplicationExist){
            return res.status(400).json({
                message:"You already applied for this job",
                succes:false
            })
        }
        // check job exst
        let job = await Job.findById(jobId).exec();
        if(!job){
            return res.status(404).json({
                message:"No Job Found",
                succes:false
            })
        }

        // create a new application
        const newApplication = await Application.create({
            job_id:jobId,
            applicant_user_id:userId,
        })
        if(newApplication){
            job.applications.push(newApplication._id);
            job.save();
            return res.status(201).json({
                message:"Job applied successfully",
                success:true
            })
        }else{
            return res.status(400).json({
                message:"Job Not applied successfully",
                success:false
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:`${error}`,
            success:false
        })
    }
}

// list for applied jobs
export const getAppliedJobs = async(req,res)=>{
    try {
        const userId = req.user_id;
        const applications = await Application.find({applicant_user_id:userId}).sort({createdAt:-1}).populate({
            path:'job_id',
            options:{sort:{createdAt:-1}},
            populate:{path:'company_id',options:{sort:{createdAt:-1}}}
        }).exec();
        if(!applications){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        }
        return res.status(200).json({
            message:"Applications found",
            success:true,
            applications
        }) 
    } catch (error) {
        return res.status(500).json({
            message:`${error}`,
            success:false
        })
    }
}

// applications for recruiters
export const getApplicants = async(req,res)=>{
    try {
        const userId = req.user_id;
        const jobId = req.params.id;
        const applicants = await Job.findOne({_id:jobId}).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{path:'applicant_user_id'}
        })
        if(!applicants){
            return res.status(404).json({
                message:"No Applicants found for this job",
                success:false
            })
        }
        return res.status(200).json({
            message:"Applicants found",
            success:true,
            applicants
        }) 
    } catch (error) {
        return res.status(500).json({
            message:`${error}`,
            success:false
        })
    }

}

export const updateStatus = async(req,res)=>{
    try {
        const {status} = req.body;
        if(!status){
            return res.status(400).json({
                message:"Status missed",
                success:false
            })
        }
        const applicationId = req.params.id;
        
        // find application by id;
        let application = await Application.findOne({_id:applicationId}).exec();
        if(!application){
            return res.status(404).json({
                message:"Application not found",
                success:false
            })
        }
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message:"Status updated !",
            success:true
        })

    } catch (error) {
        return res.status(500).json({
            message:`${error}`,
            success:false
        })
    }
}