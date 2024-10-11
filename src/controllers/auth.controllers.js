import user from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {generateAccesToken} from '../libs/jwt.js';




export const register = async (req, res) => {
    const {email, username, password} = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new user({
            email,
            username,
            password: passwordHash    
         }); 
        const userSaved = await newUser.save();
        const token = await generateAccesToken({id: userSaved.id });
        res.cookie("token", token);
        res.send('Usuario registrado de forma correcta');
    } catch (error) {
        res.status(500).json({message: error.message });
    }
};
export const login = (req, res) => res.send("login");