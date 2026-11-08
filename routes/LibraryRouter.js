import express from 'express';
import { validateToken, verifyStaff } from '../middlewares/AuthMiddleware.js';
import { createLibraryMaterial, deleteLibraryMaterial, downloadLibraryMaterial, fetchPublicLibrary, fetchStaffLibrary, UpdateLibraryMaterial, uploadLibraryFile } from '../controllers/LibraryController.js';
import { upload } from '../middlewares/MulterMiddleware.js';


const router = express.Router();

// get materials by staff -/library/staff
router.get(`/staff`, validateToken, verifyStaff, fetchStaffLibrary);

// get materials by public -/library/
router.get(`/`, fetchPublicLibrary);

//upload library file
router.post(`/upload-file`, validateToken, verifyStaff, upload.single("file"), uploadLibraryFile);

//create library material
router.post(`/`, validateToken, verifyStaff, createLibraryMaterial);

//update library material
router.patch(`/:id`, validateToken, verifyStaff, UpdateLibraryMaterial);

//update library material
router.delete(`/:id`, validateToken, verifyStaff, deleteLibraryMaterial);

//download library material
router.get('/download-file', downloadLibraryMaterial)

export default router;