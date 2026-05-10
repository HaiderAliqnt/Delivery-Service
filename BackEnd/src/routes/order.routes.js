import express from 'express';
import { estimateOrder } from '../controller/order.controller.js';

const router = express.Router();

router.post('/estimate', estimateOrder);

export default router;
