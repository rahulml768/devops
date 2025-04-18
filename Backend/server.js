import http from "http"
import { app } from "./app.js"
import "dotenv/config";

// creatimg server
const server  = http.createServer(app);
const port = process.env.PORT

// connected to this port
server.listen(port,()=>{
    console.log(`server is listen at ${port}`)
});