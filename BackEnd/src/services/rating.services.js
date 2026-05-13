import { pool } from '../DB/index.js';

export const addRatingService = async ({
    order_id,
    reviewer_id,
    reviewee_id,
    score,
    feedback
}) => {

    try {

        // BASIC VALIDATION
        if (
            !order_id ||
            !reviewer_id ||
            !reviewee_id ||
            !score
        ) {
            throw new Error(
                "Missing required fields"
            );
        }

        // SCORE VALIDATION
        if (score < 1 || score > 5) {
            throw new Error(
                "Score must be between 1 and 5"
            );
        }

        // INSERT RATING
        const result = await pool.query(`
            INSERT INTO rating
            (
                order_id,
                reviewer_id,
                reviewee_id,
                score,
                feedback
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `,
        [
            order_id,
            reviewer_id,
            reviewee_id,
            score,
            feedback || null
        ]);

        return result.rows[0];

    } catch (err) {

        console.error(
            "Add rating service error:",
            err
        );

        throw err;
    }
};