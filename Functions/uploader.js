const multer = require('multer');
const path= require("path")
function uploader(
    subfolder_path,
    allowed_file_types,
    max_file_size,
    error_msg
){
    const upload_path=`${__dirname}/../UploadedResources`;
    console.log("welcome",upload_path);
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            console.log("then",upload_path);
            cb(null,upload_path)
        },
        filename:(req,file,cb)=>{
            // console.log("uploader.js thika--",file);
            const ext=path.extname(file.originalname)
            // console.log("file extention------",ext);
            const filename=file.originalname.replace(ext,"")
            .toLocaleLowerCase().split(" ").join("-")+"-"+Date.now();
            cb(null,filename+ext)
        }
    });


    const upload=multer({
        storage:storage,
        limits:{
            fileSize: max_file_size
        },
        fileFilter:(req,file,cb)=>{
            console.log("came to file Filter?");
            if(allowed_file_types.includes(file.mimetype)){
                console.log("almost");
                cb(null, true)

            }else{
                console.log("came here?");
                cb(error_msg);
            }
        }
    })
    console.log("upload ----",upload);
    return upload;
}

module.exports=uploader