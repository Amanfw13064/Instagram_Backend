const mongoose=require('mongoose')

const PostSchema=new mongoose.Schema({
    title:{type:String,required:true},
    picture:{type:String,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:('user'),required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:('user')}],
    comment:[{type:String}],
    postedBy:[{type:mongoose.Schema.Types.ObjectId,ref:('user')}]
},{
    timestamps:true,
    versionKey:false
})

module.exports=mongoose.model('post',PostSchema)