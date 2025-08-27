const mongoose = require('mongoose')
const env = require('dotenv')
env.config()
const DBconnection = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('database connected')
    }
    catch (error){
        console.log(error)
    }
}
module.exports={DBconnection}