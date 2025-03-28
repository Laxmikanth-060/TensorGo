import express from 'express'
import { createOrder, getOrder} from '../controllers/payment.controllers.js';

const router = express.Router();

router.post('/create',createOrder)
router.post("/orders",getOrder)
export default router;