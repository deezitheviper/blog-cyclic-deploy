import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRouter from './routes/Post.js';
import userRouter from './routes/User.js';
import authRouter from './routes/Auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const __dirname = path.resolve();

dotenv.config()

const app = express();


app.use(express.json({ limit: "50mb" }));
if(process.env.NODE_ENV === 'dev'){
    app.use(cors({
        credentials: true,
        origin:process.env.CLIENT_URL
    }))
}

app.use(cookieParser())



//Database
const connect = async  () => {
    const connection = await mongoose.connect(process.env.MONGODB)
    .catch(
        err => {
            console.log(err)
        }
    )
    console.log(`DB connected on database named ${connection.connection.name}`)
}

mongoose.set('strictQuery', true);
mongoose.connection.on('connected', () => {
    console.log("Connected")
  }); 

mongoose.connection.on('disconnected', () => {
    console.log("Disconnected")
  });



//serve frontend
app.use(express.static(path.join(__dirname, './build')));




//Routes
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use((err,req,res,next) => {
  const errStatus = err.status || 500
  const errMessage = err.message || "Unable to complete request"
  return res.status(errStatus).json({
      success:false,
      status:errStatus,
      message:errMessage,
      stack:err.stack
  })
})
app.get('*', function(_, res) {
  res.sendFile(path.join(__dirname,'./build/index.html'),
  function(err){
    res.status(500).send(err);
  }
  );
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  
const upload = multer({ storage})
app.post('/api/upload', upload.single('img'), function (req, res) {
    const file = req.file.filename
    res.status(200).json(file)
  })
  




app.listen(5000,() => {
    connect()
    console.log("Connected!")
})