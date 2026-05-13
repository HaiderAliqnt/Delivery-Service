import {
    addRatingService
} from '../services/rating.services.js';

export const addRatingController = async (
    req,
    res
) => {

    try {

        const rating =
            await addRatingService(req.body);

        res.status(201).json({

            success: true,

            message: "Rating added successfully",

            rating
        });

    } catch (err) {

        console.error(
            "Add rating controller error:",
            err
        );

        res.status(400).json({

            success: false,

            message: err.message
        });
    }
};