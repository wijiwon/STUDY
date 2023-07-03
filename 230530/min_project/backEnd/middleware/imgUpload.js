const multer = require("multer");
const path = require("path")

exports.Upload = multer({
    storage : multer.diskStorage({
        destination: (req,file,done)=>{
            done(null, (path.join(__dirname, '..', "upload")))
        },
        filename: (req,file,done)=>{
            const ext = path.extname(file.originalname);
            const filename = path.basename(file.originalname, ext) + "_" + Date.now() + ext;
            done(null, filename);
        }
    }),
    limits : {fileSize : 10 * 1024 * 1024}      // 10MB
});