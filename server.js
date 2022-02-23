const app=require('./app')

const connect=require('./config/db')

require('dotenv').config()



app.listen(process.env.PORT || 5000,async()=>{
    await connect()
    console.log('listening port 5000')
})