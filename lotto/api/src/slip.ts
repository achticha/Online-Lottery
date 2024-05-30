// import {
//     Controller,
//     Post,
//     UploadedFile,
//     UseInterceptors,
//   } from '@nestjs/common';
//   import { FileInterceptor } from '@nestjs/platform-express';
//   import { diskStorage } from 'multer';
//   import { extname } from 'path';
//   import axios from 'axios';


//   @Controller('/api/slip')
//   export class SlipController {
//     @Post('upload')
//     @UseInterceptors(FileInterceptor('files'))
//     async uploadFile(@UploadedFile() files: Express.Multer.File) {
//       //console.log(files);
//   const file = req.file
//       try {
//         console.log("Upload Image", files);
//         const formData = new FormData();
//         //formData.append("filename", files);
//         formData.append("destination", "images");
//         // formData.append("create_thumbnail", true);
//         const config = {
//           headers: {
//             "content-type": 'multipart/form-data; boundary=<calculated when request is sent>',
//             'x-authorization': 'SLIPOKLPOSVMR'
//           }
//         };
//         const API = "19081";
//         const HOST = "https://api.slipok.com/api/line/apikey";
//         const url = HOST+'/'+API;
    
//         const result = await axios.post(url, formData, config);
//         console.log("REsult: ", result);
//       } catch (error) {
//         console.error(error);
//       }
//   }


//   try {
//     let data = new FormData();
//     const response = await axios.post('https://api.slipok.com/api/line/apikey/19081', data, { 
//       headers: {
//         // 'Content-Type': files.mimetype,
//         'x-authorization': 'SLIPOKLPOSVMR',
//         'accept': 'application/json',
//         'Accept-Language': 'en-US,en;q=0.8',
//         'Content-Type': 'multipart/form-data'
//       },
//     });

//     console.log(response.data); // แสดงผลลัพธ์จากการส่งข้อมูลไปยัง API
//   } catch (error) {
//     console.error('Error sending data to the API:', error);
//   }
// }


//   @Controller('/api/slip')
//   export class SlipController {
//     @Post('files')
//     @UseInterceptors(
//       FileInterceptor('files', {
//         storage: diskStorage({
//           destination: './uploads',
//           filename: (req, file, callback) => {
//             const randomName = Array(32)
//               .fill(null)
//               .map(() => Math.round(Math.random() * 16).toString(16))
//               .join('');
//             return callback(null, `${randomName}${extname(file.originalname)}`);
//           },
//         }),
//       }),
//     )
    
//     async uploadFile(@UploadedFile() file: Express.Multer.File) {
//       const formData = new FormData();
//       const blob = new Blob([file.buffer], { type: file.mimetype });
//       formData.append('file', blob, file.originalname);

//       try {
//         console.log(file.mimetype);
//         const response = await axios.post(
//           'https://api.slipok.com/api/line/apikey/19081',
//           formData,
//           {
//             headers: {
//               'Content-Type': file.mimetype,
//               'x-authorization': 'SLIPOKLPOSVMR',
//             },
//           },
//         );
//         console.log(file);
//         return { data: response.data };
//       } catch (e) {
//         return { error: e.message };
//       }
//     }
//   }
