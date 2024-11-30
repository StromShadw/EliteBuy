require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    // origin: 'http://localhost:5173',
    origin: 'https://elite-buy-5w4w.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))


app.use(fileUpload({
    useTempFiles:true,
}))


app.use('/user', require('./routers/userRouter.js'))
app.use('/api', require('./routers/categoryRouter.js'))
app.use('/api', require('./routers/productRouter.js'))
app.use('/api', require('./routers/upload.js'))


//connect MongoDB
const URL = process.env.MONGODB_URL;

const connectToDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log('Connected to DB');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};
// Call the function to connect to the database
connectToDB();


app.get('/',(req,res)=>{
    res.json({msg:'welcome to the ecommerce world'})
})


const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log('server is up and running',PORT);
    
})