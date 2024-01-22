const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    hashedpassword:{
        type: String,
        required: true,
        minLength: 8,
    }
})

const user=mongoose.model('user',userschema)

module.exports=user