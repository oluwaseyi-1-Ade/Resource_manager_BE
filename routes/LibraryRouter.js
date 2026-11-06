import express from 'express';
import { validateToken, verifyStaff } from '../middlewares/AuthMiddleware.js';
import { fetchPublicLibrary, fetchStaffLibrary } from '../controllers/LibraryController.js';


const router = express.Router();

// get materials by staff -/library/staff
router.get(`/staff`, validateToken, verifyStaff, fetchStaffLibrary);

// get materials by public -/library/
router.get(`/`, fetchPublicLibrary);



export default router;