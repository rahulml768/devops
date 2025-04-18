import express from "express"
import cors from "cors"
import { Router } from "./routes/propertyRoutes.js";
import { connect } from "./db/db.js";

export const app = express();


// in build middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// call mongoconnection
(async () => {
    await connect();
    console.log(" MongoDB connection started");
  })();

app.get('/',(res,req)=>{
    res.setEncoding("hello properties")
});


app.use('/property',Router)
