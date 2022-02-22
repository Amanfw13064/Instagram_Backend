const express=require('express')

const router=express.Router()

const upload=require('../Middleware/upload')

const Post=require('../Models/PostModel')

router.post('',upload.single("picture"),async(req,res)=>{
    try{
       let post=await Post.create({
        title:req.body.title,
        picture:req.file.path,
        user_id:req.body.user_id,
        likes:req.body.likes,
        comment:req.body.comment,
       })
       return res.status(201).send(post)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

module.exports=router