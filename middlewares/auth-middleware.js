import jwt from "jsonwebtoken";


const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:`User not authenticated`,
                success:false
            }) 
        }
        const decode = await jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:`Invalid Auth token`,
                success:false
            }) 
        }
        req.user_id = decode.user_id;
        next();
    } catch (error) {
        return res.status(500).json({
            message:error,
            success:false
        }) 
    }
}


export default isAuthenticated;