import express from 'express';
import orderRouter from './routes/order.routes.js';

const app = express();
app.use(express.json());
app.use('/api/orders', orderRouter);

export default app;