const express=require('express')

const router=express.Router()

const upload=require('../Middleware/upload')

const User=require('../Models/UserModel')

router.patch('/:id',upload.single('profile_pic'),async(req,res)=>{
    try{
       const user_pic=await User.findByIdAndUpdate(req.params.id,{
           profile_pic:req.file.path,
       },{new:true}).lean().exec()

       return res.status(200).send(user_pic)
    }catch(err){
         return res.status(500).send(err.message)
    }
})

router.get('',async(req,res)=>{
    try{ 
        const user=await User.find().lean().exec()
        return res.status(201).send(user)
    }catch(err){
          return res.status(500).send(err.message)
    }
})

module.exports=router