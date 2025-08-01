import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { connect } from 'mongoose';
import connectDB from './configs/db.js';
const app = express();
await connectDB
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>res.send("API is Working"))
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log("Server is running on "+ PORT)
})
export default app;