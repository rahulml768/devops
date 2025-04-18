import express from "express";
import { body } from "express-validator";
import { saveProperty, getProperty, updateProperty, deleteproperty,getSelectedProperty } from "../controller/propertyController.js";

// create router
export const Router =express.Router();

// all http methods via created router
Router.post(
    "/",
    // validate result
    [
      body("title").notEmpty().withMessage("Title is required"),
      body("description").notEmpty().withMessage("Description is required"),
      body("price").notEmpty().withMessage("Price is a required"),
      body("category").notEmpty().withMessage("Category is required"),
    ],
    saveProperty
  );
Router.get("/",getProperty);
Router.put("/:id",updateProperty);
Router.delete("/:id",deleteproperty);
Router.get("/:id",getSelectedProperty)

   