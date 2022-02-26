const express=require('express')

const router=express.Router()

const Post=require('../Models/PostModel')

const {cloudinary}=require('../utiles/Cloudnary')

router.post('',async(req,res)=>{
    try{
        const fileStr=req.files.picture
        const uploadRes=await cloudinary.uploader.upload(fileStr.tempFilePath) 
       let post=await Post.create({
        title:req.body.title,
        picture:uploadRes.url,
        user_id:req.body.user_id,
       })
       return res.status(201).send(post)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.get('',async(req,res)=>{
    try{
          const post=await Post.find().populate("user_id").sort('-createdAt').populate('postedBy').lean().exec()
          return res.status(200).send(post)
    }catch(err){
       return res.status(500).send(err.message)
    }
})

router.patch('/:id/likes',async(req,res)=>{
    try{
        const post=await Post.findByIdAndUpdate(req.params.id,{
            $push:{likes:req.body.likes}
        },{new:true}).populate('postedBy').lean().exec()
        return res.status(200).send(post)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.patch('/:id/unlikes',async(req,res)=>{
    try{
        const post=await Post.findByIdAndUpdate(req.params.id,{     
            $pull:{likes:req.body.likes}
        },{new:true}).populate('comment').lean().exec()
        return res.status(200).send(post)
    }catch(err){
        return res.status(500).send(err.message)
    }
})
router.patch('/:id/comment',async(req,res)=>{
    try{
        const post=await Post.findByIdAndUpdate(req.params.id,{
            $push:{comment:req.body.comment,
            postedBy:req.body.postedBy},
            
        },{new:true}).populate('postedBy').lean().exec()
        return res.status(200).send(post)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const post=await Post.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).send(post)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

module.exports=router