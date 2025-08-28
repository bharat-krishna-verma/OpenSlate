import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import userRouter from './routes/user.route.js';
import blogRouter from './routes/blog.route.js';
const app = express();
await connectDB();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("API is working fine")
})
app.use('/api/user',userRouter);
app.use('/api/blog',blogRouter);

const PORT = process.env.PORT || 3000 ;
app.listen(PORT , ()=>{
    console.log('Server is running on port '+PORT);
})