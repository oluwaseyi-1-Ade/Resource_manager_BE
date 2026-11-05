import express from 'express';
import { validateToken } from '../middlewares/AuthMiddleware.js';
import { fetchStaffLibrary } from '../controllers/LibraryController.js';


const router = express.Router();

// get materials by staff -/library/staff
router.get(`/staff`, validateToken, fetchStaffLibrary);





export default router;