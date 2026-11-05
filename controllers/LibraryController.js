import db from '../models/index.js';

const LibraryMaterials = db.Library;

// get materials by staff -/library/staff
export const fetchStaffLibrary = async (req, res) =>{
    try {
        const userId = req.user.id;
        const Materials = LibraryMaterials.findAll({where: {userId: userId}});
        res.status(200).json({message: 'Data fetched successfully', data: Materials});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}