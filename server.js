const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const bcrypt=require('bcrypt')
const { error } = require('console')
const User=require('./user')
dotenv.config()
const saltRounds=10

mongoose.connect(process.env.URL).then(console.log('Mongodb is connected'))

app.use(express.json())

app.post('/signup',async(req,res)=>{
    try {
        const user=await User.find({$or:[
            {username: req.body.username},
            {email: req.body.email}]})
        if (user){
            res.send('User already exists').status(401)
        }
       await bcrypt.hash(req.body.password,saltRounds,async(hash,err)=>{
           if(err){
            console.log(err)
            res.status(500)
           }
           const newuser= await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        res.send(newuser)
        })
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

app.listen(3000,()=>{
    console.log("server is running")
})
