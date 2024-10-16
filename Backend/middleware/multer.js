import multer from "multer";

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, 'uploads');  // Set the destination folder for uploads
    //   },
    filename:(req,file,cd)=>{
        cd(null,file.originalname)
    }
})

const upload = multer({storage:storage})

export default upload