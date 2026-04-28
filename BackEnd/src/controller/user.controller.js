import { signupService , loginService } from "../services/user.services.js";
import { generateToken } from "../utils/token.js";
export const signupController = async (req, res) => {
    try {
        console.log("Controller received req.body:", req.body);
        const user = await signupService(req.body);

        const token = generateToken(user);

        res.status(201).json({
            success: true,
            token,
            role: user.role
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};
export const loginController = async (req, res) => {
    try {
        const user = await loginService(req.body);

        const token = generateToken(user);

        res.json({
            success: true,
            token,
            role: user.role
        });

    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        });
    }
};

