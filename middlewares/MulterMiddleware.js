import {v2 as cloudinary} from 'cloudinary';
import multer from 'multer';

// Configure Cloudinary with your free credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET, 
    secure: true
});

// Configure Multer to temporarily save the file to an 'uploads' folder
export const upload = multer({dest: "uploads/"});


export {cloudinary};