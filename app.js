const express=require('express')

const app=express()

app.use(express.json())

const {signin,signup} =require('./Controllers/AuthController')

const UserControler=require('./Controllers/UserController')

const PostController=require('./Controllers/PostControler')

app.use(express.static('uploads'))

app.use('/signup',signup)

app.use('/post',PostController)

app.use('/signin',signin)

app.use('/user',UserControler)

module.exports=app