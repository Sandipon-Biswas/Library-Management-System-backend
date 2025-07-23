import "dotenv/config"
import express, { json } from "express";
import mongoose from "mongoose"
import cors from "cors"

import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/books.js";
import issueRoutes from "./routes/issue.js";
import adminRoutes from "./routes/admin.js";
import connectToMongo from "./database/db.js";


const app= express();
app.use(express.json());
app.use(cors());
//# abailable routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/issue", issueRoutes);
app.use("/api/admin", adminRoutes);


app.get('/',(req,res)=>{
    res.send("hello")
})
connectToMongo()
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running on the port http://localhost:${port}`)
})