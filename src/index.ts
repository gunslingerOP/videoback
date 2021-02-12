import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
const app = express();
import * as cors from "cors";

let port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
// app.use("/v1", v1);

createConnection()


const server =app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
  
export default server;
