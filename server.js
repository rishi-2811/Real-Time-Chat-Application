const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const bcrypt=require('bcrypt')
const { error } = require('console')
const User=require('./user')
const jwt=require('jsonwebtoken')
dotenv.config()
const saltRounds=10
const seckey=process.env.key

mongoose.connect(process.env.URL).then(console.log('Mongodb is connected'))

app.use(express.json())

app.post('/signup',async(req,res)=>{
    try {
        const user=await User.findOne({$or:[
            {username: req.body.username},
            {email: req.body.email}]})
        if (user){
           return res.send('User already exists').status(401)
        }
        bcrypt.genSalt(saltRounds,(err,salt)=>{
            if(err)
            return res.status(500)
            bcrypt.hash(req.body.hashedpassword,salt,async(err,hash)=>{
                    if(err){
                     console.log(err)
                     return res.status(500)
                    }
                    const newuser= await User.create({
                     username: req.body.username,
                     email: req.body.email,
                     hashedpassword: hash
                 })
                 return res.redirect('./login')
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

app.post('/login',async(req,res)=>{
    try {
        const user=await User.findOne({$or:[
            {username: req.body.username},
            {email: req.body.username}]})
        if (!user){
           return res.send('New User').status(401)
        }
        bcrypt.compare(req.body.hashedpassword,user.hashedpassword,(err,result)=>{
            if(err){
                console.log(err)
              return res.status(500)
            }
            if(result){
                const payload = Object.assign({}, user)
                const token=jwt.sign(payload,seckey,{expiresIn:'1h'})
               return res.send(token)
            }
            return res.send('incorrect password')
        }) 
       
    
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

app.listen(3000,()=>{
    console.log("server is running")
})
