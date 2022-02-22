const jwt=require('jsonwebtoken')

require('dotenv').config()

const newToken=(user)=>{
    return jwt.sign({user:user},process.env.JWT_SECRET_KEY)
}

const User=require('../Models/UserModel')

const signup=async(req,res)=>{
    try{
        let user=await User.findOne({username:req.body.username})
        if(user){
            return res.status(400).send({message:"User with that username already exists"})
        }
        user=await User.create(req.body)

        const token=newToken(user)

        return res.send({user,token})

    }catch(err){
        return res.status(500).send(err.message)
    }
}
const signin=async(req,res)=>{
    try{
        console.log("ss")
        let user=await User.findOne({username:req.body.username})
        console.log(user)
        if(!user){
            return res.status(400).send({message:"Either username or password incorrect"})
        }
        const verify=user.checkpassword(req.body.password)

        if(!verify){
            return res.status(400).send({message:"Either username or password incorrect"})
        }
        const token=newToken(user)
        return res.send({user,token})

    }catch(err){
        return res.status(500)
    }
}
module.exports={signup,signin}