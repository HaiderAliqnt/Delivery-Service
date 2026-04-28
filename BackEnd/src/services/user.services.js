import bcrypt from "bcrypt";
import { createUser,findUserByPhoneNum } from "../models/user.model.js";
import { generateToken } from "../utils/token.js";
export const signupService = async ({name,password,phone_number}) =>{

    console.log("Signup service received:", { name, password, phone_number });

    //validate input
    if(!name || !password || !phone_number){
        throw new Error("MISSING FIELDS");
    }

    //check if user exists by calling find user by phone num from model
    const existing = await findUserByPhoneNum(phone_number);
    if(existing) {
        throw new Error("User already exists")
    } 

    //hash the password 
    const hashedpassword = await bcrypt.hash(password,10);

    //create the user by calling the create user function from model
    const user = await createUser(
        name,
        hashedpassword,
        phone_number,
        'customer'
    );
    return user;
};

export const loginService = async({phone_number,password}) =>{
    
    const user = await findUserByPhoneNum(phone_number);

    if(!user){
        throw new Error("User not found")
    }

    const isMatch = await bcrypt.compare(password , user.password);

    if(!isMatch){
        throw new Error("Invalid credentials");
    }

    return user;
}

