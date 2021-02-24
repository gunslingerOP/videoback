import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
const app = express();
const fileUpload = require('express-fileupload');
import * as cors from "cors";
import router from "../routes/v1";

let port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use("/v1", router);

createConnection()


const server =app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
  
export default server;
