const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const dotenv=require('dotenv')
dotenv.config()
const seckey=process.env.key


const auth=(req,res,next)=>{
    const token=req.cookies.access_token
    if(!token)
    res.redirect('http://localhost:6000/login')
    return res.status(403)
    try {
        const data=jwt.verify(token,seckey)
        req.body=data
        return next()
    } catch (error) {
        console.error(error)
        return res.status(500)
    }
}

module.exports=auth