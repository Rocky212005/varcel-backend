const multer=require("multer")

// conftige storage 

const storage= multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);

    },

});
// file fillter 
const fileFilter=(req,file,cb)=>{
    const allowedTypes=['image/jpeg','image/png','image/jpg']; 
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('only jpeg,png,jpg  formet allowed'),false);
    }
};

const upload=multer({storage,fileFilter});

module.exports=upload;