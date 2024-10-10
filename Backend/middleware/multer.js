import multer from "multer";

const storage = multer.diskStorage({
    filename:(req,file,cd)=>{
        cd(null,file.originalname)
    }
})

const upload = multer({storage})

export default upload