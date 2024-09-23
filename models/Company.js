import {Schema,model} from "mongoose";


const companySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    website:{
        type:String,
    },
    location:{
        type:String,
    },
    logo:{
        type:String,
    },
    created_By:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },   
},{timestamps:true});

export const Company = model('Company',companySchema)