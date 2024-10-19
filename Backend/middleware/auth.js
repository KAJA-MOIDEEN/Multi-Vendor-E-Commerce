import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) =>{
try {
    const { token } = req.headers;
    
    if(!token){
        return res.json({ success: false, message: 'Not Authorized Login Again'})
    }
    const token_decode = await jwt.verify(token, process.env.JWT_SECRET)
    
    req.body.userId = token_decode._id
    next()
    
} catch (error) {
    console.log(error);
    res.json({success: false,message:error.message})

    
    
}
}
export default authUser
