import express from "express";
import {
    addRatingController
} from '../controller/rating.controller.js';
const rateRouter = express.Router();

rateRouter.post("/add",addRatingController )

export default rateRouter;