import { propertyModel } from "../model/propertyModel.js";
import { property } from "../services/propertyService.js";
import { validationResult } from "express-validator";

// method to save the property on database
export const saveProperty = async(req,res,next)=>{
    try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const{title,description,price,category} =req.body
 
    if(!title || !description || !price || !category){
       return  res.status(400).json({err:"All fields are required"})
    }

    // call a function which is in service.js file to create that property
    const propertyDetails = await property({
        title,
        description,
        price,
        category
    });
    // if we find property it will send status and detail
    if(propertyDetails){
       return  res.status(200).json({
        message:"Details have been saved",
        property:propertyDetails
    })
    }
}
      catch(err){  
     next(err);
}
};

// method to get all the property from database
 export const getProperty = async(req,res,next)=>{  
    try {
        const properties = await propertyModel.find({});   
        if (properties.length > 0) {
          return res.status(200).json(properties);
        } else {
          return res.status(404).json({ message: "No properties found" });
        }
        }
    catch(error){
    next(error);
    return res.status(500).json({  error: error.message });
}
};

// method to update the property send from client side 
export const updateProperty = async(req,res,next)=>{
    try{
      // get id of update property
  const id = req.params.id 
  const {title,description,price,category} = req.body
 
  if(!id){
    return res.status(400).json({err:"propertyId is required"})
  }
  if(!title || !description || !price || !category){
    return  res.status(400).json({err:"All fields are required"})
 }
// get details of update property 
 const updated = await propertyModel.findByIdAndUpdate(
    id,
    { title, description, price, category },
    { new: true }
  );
//  updated deatils send to client side
  if (updated) {
    return res.status(200).json({
      message: "Property updated",
      property: updated, 
  })
  } else {
    return res.status(404).json({ message: "Property not found" });
  }
    }
    catch(err){
        next(err);
    }
};


// method to delete the property
   export const deleteproperty = async(req,res,next)=>{
     try{
  // get id of delete property
    const id  = req.params.id;
    if(!id){
        return res.status(400).json({err:"id is required"})
    }
    const deleted = await propertyModel.deleteOne({ _id: id });
        if (deleted.deletedCount > 0) {
            return res.status(200).json({ message: "Property is deleted" });
        } else {
            return res.status(404).json({ message: "Property not found" });
        }
}
        catch(err){
          next(err);
}

};

//  method to get the details of the seletced property
export const getSelectedProperty = async(req,res,next)=>{
  const id  = req.params.id
  if(!id){
    res.status(400).json({message:"id is required"})
  }
  // selected property details
  const selectedproperty = await propertyModel.findById(id)
  if(selectedproperty){
    return res.status(201).json(selectedproperty);
  }
  else{
    return res.status(400).json({message:"not found"})
  }

}