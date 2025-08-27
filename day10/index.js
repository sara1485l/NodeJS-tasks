const express =require('express')
const path = require('path')
const env = require('dotenv')
const {DBconnection} =require('./config/DBconnection')
const { default: mongoose } = require('mongoose')

env.config()
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname,'/public')))

    DBconnection()

mongoose.connection.once('connected',()=>{
    console.log('database connected .......')
        app.listen(process.env.port,()=>{
        console.log(`server is running at port ........`)
})
})

module.exports={app}