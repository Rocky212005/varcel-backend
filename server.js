const express=require('express')
require("dotenv").config()
const app=express()
const cors=require('cors')
const path=require('path')
const authRoutes=require('./routes/authRoutes')
const sessionRoutes=require('./routes/sessionRoutes')
const questionRoutes=require('./routes/questionRoutes')
const {protect}=require('./middlewares/authMiddleware')
const {generateInterviewQuestions,GenerateConceptExplanation}=require('./controllers/aiController')


const connectDB=require('./config/db.js')
const { GenerateContentResponse } = require('@google/genai')


// middelwares for cors

app.use(
    cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],

}));

app.use(express.json())
connectDB()



//Routes

app.use("/api/auth", authRoutes);
app.use("/api/sessions",sessionRoutes);
app.use("/api/questions",questionRoutes);

app.use("/api/ai/generate-questions", protect,generateInterviewQuestions);
app.use("/api/ai/generate-explanation",protect,GenerateConceptExplanation);

//server upload folder
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}));


//start server

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{console.log(`server running on ${PORT}`)})

