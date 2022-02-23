const app=require('./app')

const connect=require('./config/db')

require('dotenv').config()

const port=process.env.Port || 5555;

app.listen(port,async()=>{
    await connect()
    console.log(`listening port ${port}`)
})