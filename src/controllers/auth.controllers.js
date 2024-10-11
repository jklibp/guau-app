import user from '../models/user.model.js';

export const register = async (req, res) => {
    const {email, username, password} = req.body;
    try {
        const newUser = new user({
            email,
            username,
            password
         }); 
        await newUser.save();
        res.send('Usuario registrado de forma correcta');
    } catch (error) {
        console.log(error);
    }
};
export const login = (req, res) => res.send("login");