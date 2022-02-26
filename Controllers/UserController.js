const express=require('express')

const router=express.Router()

const {cloudinary}=require('../utiles/Cloudnary')


const User=require('../Models/UserModel')

router.patch('/:id/profile',async(req,res)=>{
    try{
        const fileStr=req.files.profile_pic
        const uploadRes=await cloudinary.uploader.upload(fileStr.tempFilePath) 
       const user_pic=await User.findByIdAndUpdate(req.params.id,{
           profile_pic:uploadRes.url,
       },{new:true}).lean().exec()
      return res.status(200).send(user_pic)
    }catch(err){
         return res.status(500).send(err.message)
    }
})

router.get('',async(req,res)=>{
    try{ 
        const user=await User.find().populate('follower').populate('following').lean().exec()
        return res.status(201).send(user)
    }catch(err){
          return res.status(500).send(err.message)
    }
})

router.get('/:id',async(req,res)=>{
    try{ 
        const user=await User.findById(req.params.id).populate('follower').populate('following').lean().exec()
        return res.status(201).send(user)
    }catch(err){
          return res.status(500).send(err.message)
    }
})

router.patch('/:id/follower',async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,{
            $push:{follower:req.body.follower}
        },{new:true}).populate('follower').populate('following').lean().exec()
        return res.send(user)
    }catch(err){
        return res.status(500).send(err.message)
    }
})
router.patch('/:id/unfollower',async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,{
            $pull:{follower:req.body.follower}
        },{new:true}).populate('follower').populate('following').lean().exec()
        return res.send(user)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.patch('/:id/following',async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,{
            $push:{following:req.body.following}
        },{new:true}).populate('follower').populate('following').lean().exec()
        return res.send(user)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.patch('/:id/unfollowing',async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,{
            $pull:{following:req.body.following}
        },{new:true}).populate('follower').populate('following').lean().exec()
        return res.send(user)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id)
        return res.status(200).send(user)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

module.exports=router