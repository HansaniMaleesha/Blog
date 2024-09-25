import express from 'express';
import authroutes from './routes/auth.js';
import userroutes from './routes/users.js';
import postsroutes from './routes/posts.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';

const app=express();

app.use(cors({
    origin: 'http://localhost:5173', // Replace this with your frontend's URL
    methods:["POST", "GET", "DELETE","PUT"],
    credentials: true
}));



app.use(express.json());
app.use(cookieParser());

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../client/myblog/public/uploads')
    },
    filename:function(req,file,cb){
        
        cb(null,Date.now()+file.originalname)
    }
})

const upload = multer({storage:storage})

app.post('/api/upload',upload.single('file'),function(req,res){
    const file = req.file
    res.status(200).json(file.filename)


})
app.use("/api/posts",postsroutes);
app.use("/api/auth",authroutes);
app.use("/api/users",userroutes);

app.listen(8800,()=>{
    console.log("connected!")
})