import { cloudinary } from '../middlewares/MulterMiddleware.js';
import db from '../models/index.js';

const LibraryMaterials = db.Library;

// get materials by staff -/library/staff
export const fetchStaffLibrary = async (req, res) =>{
    try {
        const userId = req.user.id;
        const Materials = await LibraryMaterials.findAll({where: {userId: userId}});
        res.status(200).json({message: 'Data fetched successfully', data: Materials});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get materials by public -/library/
export const fetchPublicLibrary = async (req, res) =>{
    try {
        const {department} = req.query;

        const filter = {};

        if(department) {
            filter.department = department
        }

        const Materials = await LibraryMaterials.findAll({where: filter});
        res.status(200).json({message: 'Data fetched successfully', data: Materials});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//uploading materials by staff
export const uploadLibraryFile = async(req, res) => {
    try {
        const file = req.file;

        if(!file) {
            res.status(400).json({message: "No file provided"});
        }

        const result = cloudinary.uploader.upload(req.file.path, {
            folder: 'library_materials',
            resource_type: 'auto'
        })
    } catch (error) {
        
    }
}