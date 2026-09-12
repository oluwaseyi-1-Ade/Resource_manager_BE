import express from 'express';
import { validateToken } from '../middlewares/AuthMiddleware.js';
import { getAllUsers } from '../controllers/UsersController.js';

const router = express.Router();

//get all users 
router.get('/', validateToken, getAllUsers);
// approve user 

//reject user 

//revoke user 


export default router;