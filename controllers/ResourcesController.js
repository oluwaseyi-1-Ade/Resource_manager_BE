import { cloudinary } from "../middlewares/MulterMiddleware.js";
import db from "../models/index.js";
import fs from 'fs';

const Resources = db.Resources;

export const getResources = async(req, res) => {
    try {
        const {count, rows:data} = await Resources.findAndCountAll()

        res.status(200).json({message: "success", data:data, total:count})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const uploadResourceImage = async(req, res) => {
    try {
       // Because Multer ran first, req.file now exists!
       if(!req.file) {
       return res.status(400).json({message: "No image file provided"})
       }

       // Upload to Cloudinary
       console.log("Cloudinary Config:", cloudinary.config());
       const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'resource_manager'
       });

       // Delete the temporary file from your local server
       fs.unlinkSync(req.file.path);

       // Send the URL back
       res.status(200).json({ 
      message: "Image uploaded successfully", 
      image_url: result.secure_url 
    });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createResource = async(req, res) => {
    try {
        const {name, type, status, description, capacity, image} = req.body;

        if(name.trim() == "" || type.trim() == "") {
            return res.status(400).json({message: "Name and Type of resource are compulsory"})
        }

        const newR = await Resources.create({name, type, status, description, capacity, image});


       return res.status(200).json({message: "Resource Created Succesfully", data: newR});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const editResource = async(req, res) => {
    try {
        const resourceId = req.params.id;
        const body = req.body;

        const existingResources = await Resources.findByPk(resourceId);

        if(!existingResources) {
           return res.status(404).json({message: "Resource does not exist"});
        }

        const updated = await existingResources.update({...existingResources, ...body});


       return res.status(200).json({message: "success", data: updated})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}