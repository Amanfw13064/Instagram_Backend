const bcrypt = require('bcryptjs')
const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    email:{type:String,required:true},
    name:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    profile_pic:String,
    post:[{type:Object}],
    follower:[{type:String}],
    following:[{type:String}]
},{
    timestamps:true,
    versionKey:false
}) 
userSchema.pre('save',function(next){
    if(!this.isModified('password')) next()

    this.password=bcrypt.hashSync(this.password,8)
    next()
})

userSchema.methods.checkpassword=(function(password){
    return bcrypt.compareSync(password,this.password)
})

module.exports=mongoose.model('user',userSchema)