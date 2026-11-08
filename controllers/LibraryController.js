import { rmSync } from "fs";
import { cloudinary } from "../middlewares/MulterMiddleware.js";
import db from "../models/index.js";

const LibraryMaterials = db.Library;

// get materials by staff -/library/staff
export const fetchStaffLibrary = async (req, res) => {
  try {
    const userId = req.user.id;
    const Materials = await LibraryMaterials.findAll({
      where: { userId: userId },
    });
    res
      .status(200)
      .json({ message: "Data fetched successfully", data: Materials });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get materials by public -/library/
export const fetchPublicLibrary = async (req, res) => {
  try {
    const { department } = req.query;

    const filter = {};

    if (department) {
      filter.department = department;
    }

    const Materials = await LibraryMaterials.findAll({ where: filter });
    res
      .status(200)
      .json({ message: "Data fetched successfully", data: Materials });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//uploading materials by staff
export const uploadLibraryFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "library_materials",
      resource_type: "auto",
    });

    res.status(200).json({
      message: "upload successful",
      fileUrl: result.secure_url,
      fileSize: req.file.size,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create library material
export const createLibraryMaterial = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      title,
      course,
      uploadedBy,
      department,
      description,
      fileType,
      fileUrl,
      fileName,
      fileSize,
    } = req.body;

    const newMaterial = await LibraryMaterials.create({
      userId,
      uploadedBy,
      title,
      course,
      department,
      description,
      fileType,
      fileUrl,
      fileName,
      fileSize,
    });

    res.status(201).json({
      message: "Material created",
      data: newMaterial,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update library material
export const UpdateLibraryMaterial = async (req, res) => {
  try {
    const materialId = req.params.id;

    const existingMaterial = await LibraryMaterials.findByPk(materialId);

    if (!existingMaterial)
      return res.status(400).json({ message: "Material not found" });

    const body = req.body;

    const updated = await existingMaterial.update({
      ...existingMaterial,
      ...body,
    });

    res.status(200).json({
      message: "Material created",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete material
export const deleteLibraryMaterial = async (req, res) => {
  try {
    const materialId = req.params.id;
     const existingMaterial = await LibraryMaterials.findByPk(materialId);

    if (!existingMaterial)
      return res.status(400).json({ message: "Material not found" });

    await LibraryMaterials.destroy({where: {id: materialId}});

    res.status(204)

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// download material 
export const downloadLibraryMaterial = async (req, res) => {
  try {
    let {fileUrl} = req.query;

    if(!fileUrl) res.status(400).json({message: "File URL not provided"});

    // CLOUDINARY PRO-TIP: 
    // By default, browsers will open PDFs in a new tab rather than downloading them.
    // To force the browser to physically download the file, we inject 'fl_attachment' into the URL.
    // if(fileUrl.includes('/upload/')) {
    //   fileUrl = fileUrl.replace('/upload/', '/upload/fl_attachment/');
    // }

    // Redirect directly to the Cloudinary download link
    res.redirect(fileUrl);
    
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
}