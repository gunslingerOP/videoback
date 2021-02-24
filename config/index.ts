require("dotenv").config();

let config: any;
export default config = {
  jwtSecret: process.env.JWT_SECRET ,
  sendGrid:process.env.SENDGRID_API_KEY,
  port: process.env.PORT ,

  cloudinaryUrl:process.env.CLOUDINARY_URL,
  cloudAPI:process.env.API_CLOUD,
  cloudSecret:process.env.API_SECRET,
  cloudName: process.env.CLOUD_NAME,

  accountSID: process.env.ACCOUNT_SID,
  authToken: process.env.AUTH_TOKEN,


  googleId:process.env.GOOGLE_CLIENT_ID,
  googleSecret:process.env.GOOGLE_SECRET,

  wasabiSecret:process.env.BLACK_SECRET,
  wasabiAccess:process.env.BLACK_ACCESS,


};