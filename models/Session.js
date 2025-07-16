const mongoose=require('mongoose')


const sessionSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",require:true},
    experience:{type:String,require:true},
    role:{type:String,require:true},
    description:{type:String},
    topicToFocus:{type:String},
    questions:[{type:mongoose.Schema.Types.ObjectId, ref:"Question"}],


},  {timestamps:true});

module.exports=mongoose.model("Session",sessionSchema);