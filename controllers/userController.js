import { wrapAsyncErrors } from "../middlewares/AsyncError.js"
import AppError from "../middlewares/Error.js"
import { User } from "../model/UserSchema.js";
import createSession from "../utils/createSession.js"


export const register = wrapAsyncErrors(async (req, res, next) => {
    try {
        const { name , email , phone , password , bitcoinWallet} = req.body;
        console.log(name, email , phone, password , bitcoinWallet)
        if (!name|| !email || !phone || !password) {
            return next(new AppError("Some Fields are missing.", 400));
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new AppError("Email is already registered.", 400));
        }

        const userData = {
            name ,
            email ,
            phone ,
            password,
            bitcoinWallet
        };

        const newUser = await User.create(userData);
        if (!newUser) {
            return next(new AppError("Internal Server Error", 500));
        }

        createSession(newUser._id , req, res , 201 , "User Registered!");
    } catch (error) {
        next(error);
    }
});
