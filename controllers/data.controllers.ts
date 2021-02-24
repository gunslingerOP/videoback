import axios from "axios";
import { file } from "googleapis/build/src/apis/file";
import config from "../config";
let accessKeyId = config.wasabiAccess;
let secretAccessKey = config.wasabiSecret;
import { errRes, okRes } from "../tools/helpers";
let mybucket = "videoback";
const tus = require('tus-js-client');
const B2 = require("backblaze-b2");
const qencode = require("qencode-api");
const b2 = new B2({
  accountId: accessKeyId, // or accountId: 'accountId'
  applicationKey: secretAccessKey, // or masterApplicationKey
});
const qencodeApiClient = new qencode({
  key: config.qencodeKey,
  endPoint: `https://api-qa.qencode.com`,
});

var AWS = require("aws-sdk");
const endPoint = new AWS.Endpoint("https://s3.us-west-000.backblazeb2.com");

export class DataController {
  static uploadVideo = async (req, res) => {
    const payload = null;

    if (!req.files.video)
      return errRes(res, `Please make the form field name 'video'`);
    if (!req.files || Object.keys(req.files).length === 0) {
      return errRes(res, `No files were uploaded`);
    }

    let filePath = req.files.video;
    let fileName = filePath.name;
    fileName = fileName.replace(/\s/g, "+");

    var params = {
      Bucket: mybucket,
      Key: fileName,
      Body: filePath.data,
    };

    let auth = await b2.authorize();
    // var options = {   endpoint: task.uploadUrl + '/' + task.taskToken,
    //  metadata: {     filename: fileName,     filetype: 'video/mp4'   },
    //   uploadSize: size,   retryDelays: [0, 1000, 3000, 5000],   onError: function (error) {     throw error;   },
    //     onProgress: function (bytesUploaded, bytesTotal) {
    //       var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
    //         console.log(bytesUploaded, bytesTotal, percentage + '%');   },
    //          onSuccess: function () {
    //              console.log('Upload finished:', upload.url);
    //               var url = upload.url.split('/');
    //                var file_uuid = url[url.length - 1];
    //                   var source_uri = `tus:` + file_uuid;
    //                   console.log('Uploaded video uri: ', source_uri); } };
    //               let task = qencodeApiClient.CreateTask();
    //               console.log('Created new task: ', task.taskToken);
    //                console.log('Upload URL: ', task.uploadUrl);
    //                console.log('Upload size, bytes: ', size);


  
    
    
   
    
    let task = qencodeApiClient.CreateTask(); 
  
    let uploadUrl = task.uploadUrl + "/" + task.taskToken;
    console.log(uploadUrl);
    
    
    
    
    let upload = new tus.Upload(filePath.data, {
      endpoint: uploadUrl,
      retryDelays: [0, 3000, 5000],
      metadata: {
        filename: fileName,
        filetype: 'video/mp4' ,
      },
      size:filePath.data.length,
      onError: function (error) {
        console.log("Failed because: " + error);
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(bytesUploaded, bytesTotal, percentage + "%");

      },
      
      onSuccess:async function  () {
        console.log(
          'Download completed'
        );
        var url = upload.url.split('/');    
        var file_uuid = url[url.length - 1]; 
           var source_uri = `tus:` + file_uuid;   
           console.log('Uploaded video uri: ', source_uri);  
        let request = {
          format: [
            {
              output: "advanced_hls",
              separate_audio: 0,
              segment_duration: 6,
              destination: {
                url: `b2://backblaze.com/videoback/${fileName}`,
                secret: secretAccessKey,
                key: accessKeyId,
              },
              stream: [
               
                {
                  video_codec: "libx264",
                  height: 1080,
                  audio_bitrate: 128,
                  bitrate: 5200,
                  framerate: "60",
                }
              ],
              "fmp4": 1
            },
          ],
          encoder_version: "2",
          source: source_uri,
        };
        
        await task.StartCustom(request);
         CheckTaskStatus();
      },
    })
    
      await upload.start();
    
    
    
    async function CheckTaskStatus() {
      while (task.GetStatus().status != "completed") {
        console.log(task.GetStatus().status);
        await sleep(2000);
      }
      console.log(task.GetStatus().status);
    }
    
    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }


































    // let url = await b2.getUploadUrl({
    //   bucketId: "645c13103c41ce1f70700c1a",
    // });

    // let link = auth.data.downloadUrl + `/file/videoback/` + fileName;

    // await b2
    //   .uploadFile({
    //     uploadUrl: url.data.uploadUrl,
    //     uploadAuthToken: url.data.authorizationToken,

    //     fileName: fileName,

    //     data: filePath.data, // this is expecting a Buffer, not an encoded string

    //     onUploadProgress: function (update) {
    //       console.log(update);
    //     }||console.log('nothin')
    //     ,
    //   })
    //   .then(async () => {
    //     console.log(`files uploaded`);
    //     let task = await qencodeApiClient.CreateTask();
    //     console.log("Created new task with token: ", task.taskToken);

    //     let request = {
    //       format: [
    //         {
    //           output: "advanced_hls",
    //           separate_audio: 1,
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
    //             },
    //           ],
    //           "fmp4": 1
    //         },
    //       ],
    //       encoder_version: "2",
    //       source: link,
    //     };

    //     task.StartCustom(request, payload);
    //     console.log("Status URL: ", task.statusUrl);

    //     await CheckTaskStatus();

    //     async function CheckTaskStatus() {
    //       while (task.GetStatus().status != "completed") {
    //         console.log(task.GetStatus().status);
    //         await sleep(2000);
    //       }
    //       console.log(task.GetStatus().status);
    //     }

    //     function sleep(ms) {
    //       return new Promise((resolve) => {
    //         setTimeout(resolve, ms);
    //       });
    //     }
    //   });

    // return okRes(res, {
    //   Link: auth.data.downloadUrl + `/file/videoback/` + fileName,
    // });
    // await b2.getDownloadAuthorization({
    //   bucketId: "645c13103c41ce1f70700c1a",
    //   fileNamePrefix: fileName,
    //   validDurationInSeconds: 60480, // a number from 0 to 604800
    //   // ...common arguments (optional)
    // }); // returns promise

    // // download file by name
    // let download = await b2.downloadFileByName({
    //   bucketName: mybucket,
    //   fileName: fileName,
    //   responseType: "json", // options are as in axios: 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    // });

    // let s3 = await new AWS.S3({
    //   endpoint: endPoint,
    //   region:'us-west-000',
    //   accessKeyId: accessKeyId,
    //   secretAccessKey: secretAccessKey,
    // });

    //  await s3.createBucket({Bucket: mybucket}, function() {
    //     var params = {Bucket: mybucket, Key: filePath.name, Body: 'Hello World!'};
    //     s3.putObject(params, function(err, data) {
    //     if (err)
    //     console.log(err)
    //     else
    //     console.log("Successfully uploaded data to " + mybucket + "/" + filePath.name);
    //     });
    //     });

    // s3.listObjectsV2(params, function (err, data) {
    //   if (!err) {
    //       var files = []
    //       data.Contents.forEach(function (element) {
    //           files.push({
    //               filename: element.Key
    //           });
    //       });

    //   } else {
    //       console.log(err);  // an error ocurred
    //   }

    var params2 = {
      Bucket: mybucket,
      Key: filePath.name,
    };

    // s3.getObject(params2, function(err, data) {
    //   if (!err) {
    //       return okRes(res, data) // successful response
    //
    //    } else {
    //        return errRes(res,err) // an error occurred
    //    }

    // });
  };
}
