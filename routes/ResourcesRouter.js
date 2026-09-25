import express from 'express';
import { validateToken, verifyAdmin } from '../middlewares/AuthMiddleware.js';
import { createResource, editResource, getResources } from '../controllers/ResourcesController.js';

const router = express.Router();

// get all resources 
router.get('/', validateToken, getResources);

//create a resource
router.post('/', validateToken, verifyAdmin, createResource);

//edit a resource
router.patch('/:id', validateToken, verifyAdmin, editResource);


export default router;