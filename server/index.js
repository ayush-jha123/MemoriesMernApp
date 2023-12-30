import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';

const app=express();
dotenv.config({path:"C:\Users\kumar\OneDrive\Desktop\Web\Memories Project\server\.env"})
app.use(bodyParser.json({limit:"30mb",extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use('/posts',postRoutes);
app.use('/user',userRoutes);

const PORT=process.env.PORT || 5000;
const url='mongodb://127.0.0.1:27017';
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
.catch((err)=>console.error(err.message()));

// mongoose.set('useFindAndModify',false);
