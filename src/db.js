import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/pet_sitting');
        console.log('Conexión a la BD');
    } catch (error) {
        console.log(error);
    }
};