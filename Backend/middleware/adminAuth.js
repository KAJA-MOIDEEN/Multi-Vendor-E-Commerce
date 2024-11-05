import jwt from  'jsonwebtoken';
const adminAuth = async (req,res,next) => {
    try {
        // const  token  = req.headers.authorization;
        const {token} = req.headers
        
        if(!token) {
            return res.json({ success:false,message: "Not Authorized Login Again"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        

       if(!token_decode){
        return res.json({ success:false,message: "Not Authorized Login Again"})
       }
       req.body.userId = token_decode._id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message:error.message})  
    }
}

export default adminAuth