import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({storage});




// import {S3Client} from '@aws-sdk/client-s3';
// import multer from 'multer'
// import multerS3 from 'multer-s3'
// import path from 'path';
// import dotenv from 'dotenv';
// dotenv.config();

// const s3 = new S3Client({
//     region:"ap-south-1",
//     credentials:{
//         accessKeyId:process.env.S3_ACESSKEY,
//         secretAccessKey:process.env.S3_SECRET_KEY
//     }
// })
// const storage = multerS3({
//       s3: s3,
//       bucket: process.env.S3_BUCKET,
//       contentType: multerS3.AUTO_CONTENT_TYPE,
//       metadata: function (req, file, cb) {
//         cb(null, {fieldName: file.fieldname});
//       },
//       key: function (req, file, cb) {
//         let extension = file.mimetype.split('/')[1]
//         let file_key ='profileImages/' + Date.now() + '_' + new Date().getTime() + '.' + extension;
//         cb(null, file_key)
//       }
//     })

//   function checkFileType(file, cb){
//     const fileTypes = /jpeg|png|jpg|pneg|gif|mp4|mov/;
//     const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimeType = fileTypes.test(file.mimetype);
//     if (extName && mimeType) {
//         cb(null, true)
//     } else {
//         cb('Error:Images only with png jpeg jpg pneg mov')
//     }
// }  

// export const upload = multer({
//     storage:storage,
//     fileFilter: function (req,file,cb,){
//         checkFileType(file,cb)
//     },
// })






