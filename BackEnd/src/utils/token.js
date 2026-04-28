import jwt from "jsonwebtoken";

export const generateToken = (user)=> {
    return jwt.sign(
        { id:user.user_id , role: user.role},
        "secret_key",
        {expiresIn: "1d"}
    );
};

