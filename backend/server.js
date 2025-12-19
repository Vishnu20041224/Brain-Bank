import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import thoughtRouter from "./router/thoughtRouter.js"
dotenv.config()

const app = express()

connectDB()

// Middleware

app.use(express.json())
app.use(cors())

//Router

app.use("/api/thoughts",thoughtRouter)

app.get("/",(req,res)=>{
    res.json({
        message:"Brain Bank API",
        status:"success"
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is runing in ${PORT}`)
})