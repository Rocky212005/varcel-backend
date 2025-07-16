const User=require("../models/User.js")

const bcrypt=require("bcrypt")

const jwt=require("jsonwebtoken");


//genrate jwt token
const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"7d"});
};


// dec-register a new user
// route-/api/auth/registerUser
// access-public
const registerUser=async(req,res)=>{
    try{
          const {name,email,password,profileImageUrl}=req.body;

          //user alradey exists
          const userExist=await User.findOne({email})
          if(userExist){
            return res.status(400).json({
                message:"user already exists"
                
            })
          }

          //hash password
          const salt=await bcrypt.genSalt(10);
          const hashedPassword=await bcrypt.hash(password,salt);
          //create new user
          const user=await User.create({
            name,
            email,
            password:hashedPassword,
            profileImageUrl,
          });
          //return user data with jwt
          res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
             profileImageUrl:user.profileImageUrl,
             token:generateToken(user._id),
          }); 

           
    }catch(error){
        res.status(500).json({
            message:"server error",
            error:error.message,
        })

    }

}



// dec-login a new user
// route-/api/auth/loginUser
// access-public
const loginUser=async(req,res)=>{
  try{

    const{email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
      return res.status(500).json({message:"username and password in invalid "})
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(500).json({message:"username and password in invalid "})
    }

    res.json({
         _id:user._id,
         name:user.name,
         email:user.email,
         profileImageUrl:user.profileImageUrl,
         token:generateToken(user._id)
    })
  }catch(error){
       res.status(500).json({
            message:"server error",
            error:error.message,
        })
  }

}

// dec-register a new user
// route-/api/auth/getUserProfile
// access-private

const getUserProfile=async (req,res)=>{
       try{
        const user=await User.findById(req.user.id).select("-password")
        if(!user){
          return res.status(404).json({message:"User not found"})
        }
        res.json(user);

       }catch(error){
         return res.status(500).json({message:"username and password in invalid "});
       }
}


module.exports={registerUser,loginUser,getUserProfile};

