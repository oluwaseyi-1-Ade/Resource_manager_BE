import express from 'express'
import { bookingSchedule, cancelBooking, createBooking, getAllBookings } from '../controllers/BookingsController.js';
import { validateToken } from '../middlewares/AuthMiddleware.js';

const router = express.Router();


router.get('/', getAllBookings);

router.get('/public', bookingSchedule);

router.post('/', validateToken, createBooking);

router.patch('/cancel/:id', validateToken, cancelBooking);



export default router;