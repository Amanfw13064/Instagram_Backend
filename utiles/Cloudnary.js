require('dotenv').config()

const cloudinary=require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CLOUDNARY_NAME,
    api_key:process.env.CLOUDNARY_API_KEY,
    api_secret:process.env.CLOUDNARY_API_SECRET,
})

module.exports={cloudinary}