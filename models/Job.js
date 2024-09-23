import {Schema,model} from "mongoose";


const jobSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    skills:[{
        type:String,
        required:true
    }],
    salary:{
        type:Number,
        required:true,
    },
    experience:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    positions:{
        type:Number,
        required:true
    },
    company_id:{
        type:Schema.Types.ObjectId,
        ref:'Company'
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    applications:[{
        type:Schema.Types.ObjectId,
        ref:'Application'
    }],
   
},{timestamps:true});

export const Job = model('Job',jobSchema)