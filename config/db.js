const mongoose=require("mongoose")

const connectDB=async()=>{
    try{
         await mongoose.connect(process.env.MONGO_URI,{}); 
         console.log("connect to DB");
    }catch(error){

        console.error("error connecting to DB",error);
        process.exit(1);

    };


    
}

module.exports=connectDB;