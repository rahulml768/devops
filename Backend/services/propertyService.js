import { propertyModel } from "../model/propertyModel.js";

// method to save the property details in the databse
export const property =async({title,description,price,category})=>{

    if(!title || !description ||!price ||!category){
       throw new Error("All fields are required")
    }
    try{
        const createProperty = await propertyModel.create({
            title,
            description,
            price,
            category
        });
        return createProperty
    }
    catch(err){
        console.log(err.msg)
        throw new Error("failed to create property")
    }
}