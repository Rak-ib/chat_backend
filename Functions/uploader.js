const multer = require('multer');
const path= require("path")
function uploader(
    subfolder_path,
    allowed_file_types,
    max_file_size,
    error_msg
){
    const upload_path="../UploadedResources";
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,upload_path)
        },
        filename:(req,file,cb)=>{
            const ext=path.extname(file.originalname)
            const filename=file.originalname.replace(ext,"")
            .toLocaleLowerCase().split(" ").join("-")+"-"+Date.now();
            cb(null,filename+ext)
        }
    })


    const upload=multer({
        storage:storage,
        limits:{
            fileSize: max_file_size
        },
        fileFilter:(req,file,cb)=>{
            if(allowed_file_types.includes(file.mimetype)){
                cb(null, true)

            }else{
                cb(createError(error_msg));
            }
        }
    })
    return upload;
}

module.exports=uploader