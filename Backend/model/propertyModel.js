import mongoose from "mongoose";


// create schema
const propertySchema = new mongoose.Schema({
    title:{
        type:String,
        required :true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:["Apartment","Villa","Studio"],
        required:true,
    }
});

// create model
export const propertyModel = mongoose.model("properties",propertySchema);