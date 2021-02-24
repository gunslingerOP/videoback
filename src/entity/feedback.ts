import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne} from "typeorm";
import { User } from "./User";
import { Video } from "./video";

@Entity()
export class Feedback extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;


    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    recipientId: number;

    @Column()
    completed: string;

    @Column()
    needsReview: number;

    @Column()
    inProgress: number;

@ManyToOne((type)=>User, (user)=>user.feedback)
user:User

@ManyToOne((type)=>Video, (Video)=>Video.Feedbacks)
Video:Video
}


// const fs = require(“fs”); c
// const tus = require(‘tus-js-client’); 
// const QencodeApiClient = require(‘qencode-api’);


//    let path = ‘/root/bbb_30s.mp4’;
//     var file = fs.createReadStream(path); 
//     var size = fs.statSync(path).size;

// const apiKey = “5a5db6fa5b4c5”;

// const qencodeApiClient = new QencodeApiClient({key: apiKey, endpoint: `https://api-qa.qencode.com`}); 
// console.log(“AccessToken: “, qencodeApiClient.AccessToken);

// let task = qencodeApiClient.CreateTask(); 
// console.log(“Created new task: “, task.taskToken); 
// console.log(“Upload URL: “, task.uploadUrl);
//  console.log(“Upload size, bytes: “, size);    
//  var options = {   endpoint: task.uploadUrl + ‘/’ + task.taskToken,   metadata: {     filename: “bbb_30s.mp4”,     filetype: “video/mp4"   },   uploadSize: size,   retryDelays: [0, 1000, 3000, 5000],   onError: function (error) {     throw error;   },   onProgress: function (bytesUploaded, bytesTotal) {     var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);     console.log(bytesUploaded, bytesTotal, percentage + “%”);   },   onSuccess: function () {     console.log(“Upload finished:“, upload.url);     var url = upload.url.split(“/”);     var file_uuid = url[url.length - 1];     var source_uri = ‘tus:’ + file_uuid;     console.log(“Uploaded video uri: “, source_uri); } };let task = qencodeApiClient.CreateTask(); console.log(“Created new task: “, task.taskToken); console.log(“Upload URL: “, task.uploadUrl); console.log(“Upload size, bytes: “, size);    var options = {   endpoint: task.uploadUrl + ‘/’ + task.taskToken,   metadata: {     filename: “bbb_30s.mp4”,     filetype: “video/mp4"   },   uploadSize: size,   retryDelays: [0, 1000, 3000, 5000],   onError: function (error) {     throw error;   },   onProgress: function (bytesUploaded, bytesTotal) {     var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);     console.log(bytesUploaded, bytesTotal, percentage + “%”);   },   onSuccess: function () {     console.log(“Upload finished:“, upload.url);     var url = upload.url.split(“/”);     var file_uuid = url[url.length - 1];     var source_uri = ‘tus:’ + file_uuid;     console.log(“Uploaded video uri: “, source_uri); } };

// var upload = new tus.Upload(file, options); upload.start();


// let uploadUrl = task.uploadUrl + "/" + task.taskToken;
// console.log(uploadUrl);

// let upload = new tus.Upload(filePath.data, {
//   endpoint: uploadUrl,
//   retryDelays: [0, 3000, 5000, 10000],
//   metadata: {
//     filename: fileName,
//     filetype: 'video/mp4' ,
//   },
//   size:filePath.data.length,
//   onError: function (error) {
//     console.log("Failed because: " + error);
//   },
//   onChunkComplete:async function(bytesAccepted, bytesTotal,chunkSize){
//     console.log('chunk uploaded');
    
//     if(bytesAccepted==0){
//       console.log('started here');
//       await upload.abort()
//      await upload.start()
    
//     }
//   },
//   onAfterResponse: function (req, res) {
//     var url = req.getURL()
//     var value = res.getHeader("X-My-Header")
//     console.log(res)
// },
//   onProgress: function (bytesUploaded, bytesTotal) {
//     var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
//     console.log(bytesUploaded, bytesTotal, percentage + "%");
//   //   setTimeout(async function(){  
//   //     if (bytesUploaded==0){
//   //       console.log('started here');
//   //       await upload.abort()
//   //      await upload.start()
//   //     }
//   // }, 10000);
//   },
  
//   onSuccess:async function  () {
//     console.log(
//       'Download completed'
//     );
//     var url = upload.url.split('/');    
//     var file_uuid = url[url.length - 1]; 
//        var source_uri = `tus:` + file_uuid;   
//        console.log('Uploaded video uri: ', source_uri);  
//     let request = {
//       format: [
//         {
//           output: "advanced_hls",
//           separate_audio: 0,
//           segment_duration: 6,
//           destination: {
//             url: `b2://backblaze.com/videoback/${fileName}`,
//             secret: secretAccessKey,
//             key: accessKeyId,
//           },
//           stream: [
           
//             {
//               video_codec: "libx264",
//               height: 1080,
//               audio_bitrate: 128,
//               bitrate: 5200,
//               framerate: "60",
//             }
//           ],
//           "fmp4": 1
//         },
//       ],
//       encoder_version: "2",
//       source: source_uri,
//     };
    
//     await task.StartCustom(request);
//      CheckTaskStatus();
//   },
// })

//   await upload.start();



// async function CheckTaskStatus() {
//   while (task.GetStatus().status != "completed") {
//     console.log(task.GetStatus().status);
//     await sleep(2000);
//   }
//   console.log(task.GetStatus().status);
// }

// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }