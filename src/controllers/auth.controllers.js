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
export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const userFound = await user.findOne({ email });
        if (!userFound) return res.status(400).json({message:"User not found"});
        
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({message: "Password is not correct"});

        const token = await generateAccesToken({id: userFound.id });
        res.cookie("token", token);

        res.send('Usuario logeado satisfactoriamente');
    } catch (error) {
        res.status(500).json({message: error.message });
    }
};
export const logout = (req, res) => {
    res.cookie('token',"",{
        expires: new Date(0)
    })
    return res.sendStatus(200);
}
export const profilecustomer = async (req, res)=>{
    const userFound = await user.findById(req.user.id);
    if(!userFound) return res.sendStatus(404).json({message:'Usuario no encontrado'});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })
};