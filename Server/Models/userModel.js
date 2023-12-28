const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    username:{
        unique:true,
        type:String,
        required:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    password:{
        required:true,
        type:String,
        min:4
    },
    isAvatarSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        publicId: String,
        url: String,
    },
})
module.exports=mongoose.model('chatUsers',userSchema)