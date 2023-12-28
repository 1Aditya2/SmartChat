const { success, error } = require("../Utils/resWrapper");
const User=require('../Models/userModel')
const bcrypt=require('bcrypt')
const cloudinary = require("cloudinary").v2;
const registerController=async (req,res)=>{
    try {
        const {email,password,username}=req.body
        const emailCheck=await User.findOne({email})
        if(emailCheck){
            return res.send(error(403,'Email already exists'))
        }
        const userCheck=await User.findOne({username})
        if(userCheck){
            return res.send(error(403,'Username is already taken!'))
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({
            email,
            username,
            password:hashedPassword
        })

        return res.send(success(200,user._id))
    } catch (e) {
        return res.send(error(500,'Server problem,try again later!'))
    }
}
const loginController=async(req,res)=>{
    try {
        const {username,password}=req.body
        const userExists=await User.findOne({username}).select('+password')
        if(!userExists){
            return res.send(error(404,'User does not exists!'))
        }
        const matched=await bcrypt.compare(password,userExists.password)
        if(!matched){
            return res.send(error(403,'Incorrect password!'))
        }
        return res.send(success(200,userExists._id))

    } catch (e) {
        return res.send(error(500,'Server problem,try again later!'))
    }
}
const setAvatarController=async (req,res)=>{
    try {
        const {avatar,id}=req.body
        // console.log(avatar);
        const user=await User.findById(id)
        if(!user){
            return res.send(error(403,'Cannot set avatar of undefined user'))
        }
        if(avatar){
            const cloudImg=await cloudinary.uploader.upload(avatar,{
                folder:'Avatars'
            })
            user.avatarImage={
                url: cloudImg.secure_url,
                publicId:cloudImg.public_id
            }
        }
        user.isAvatarSet=true
        await user.save()
       
        return res.send(success(200,{message:'Avatar set successfully!'}))
    } catch (e) {
       
        return res.send(error(500,'Server problem, try again later!'))
    }
}
const getAvatarController=async (req,res)=>{
    try {
        const {id}=req.body
        // console.log(id);
        const user=await User.findById(id)
        console.log(user);
        if(!user){
            return res.send(error(403,'User not found!'))
        }
        const isAvatarSet=user.isAvatarSet
        const avatarImage=user.avatarImage
        return res.send(success(200,{isAvatarSet,avatarImage}))
        // return res.send(success(200,id))
    } catch (e) {
        return res.send(error(500,'Server problem,try again later!'))
    }
}
const getContactsController=async (req,res)=>{
    try {
        const {id}=req.body
        // realId=await JSON.parse(id)
        // console.log(id,'id found');
        if(!id){
            return res.send(error(403,'Current user not found!'))
        }
        const allContacts=await User.find({_id:{$ne:id}}).select(['email','username','avatarImage','_id'])
        const user=await User.findById(id)
        return res.send(success(200,{allContacts,user}))
    } catch (e) {
        return res.send(error(500,'Server problem, try again later!'))
    }
}


module.exports={
    registerController,
    loginController,
    setAvatarController,
    getAvatarController,
    getContactsController
}