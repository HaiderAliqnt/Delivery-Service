import { signupService , loginService } from "../services/user.services.js";

export const signupController = async(req , res) => {
    try{
        const user = await signupService(req.body);
        res.status(201).json(user);
    } catch (err){
        res.status(400).json({error:err.message});
    }
};

export const loginController = async(req,res) => {
    
    try{
        const user = await loginService(req.body);
        
        req.session.user_ID = user.user_ID;
        res.json({message : "Logged in" , user});

    }catch(err){
        res.status(401).json({error: err.message})
    }
};


