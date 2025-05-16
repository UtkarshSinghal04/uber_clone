const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors') 
const cookieParser = require('cookie-parser') 
const port = process.env.PORT || 5000
const connectdb = require('./db/connect')
const userRouter = require('./Routes/UserRoute')
const capRouter = require('./Routes/CapRoute')

app.use(cors())
app.use(express.json())
app.use(cookieParser())

//routes setup
app.get('/', (req, res) => {
    res.send("this is uber clone")
})

app.use('/user', userRouter)
app.use('/captain', capRouter)

//connect Db and server start
const start = async() => {
    try {
        await connectdb(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`server is listening on ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()