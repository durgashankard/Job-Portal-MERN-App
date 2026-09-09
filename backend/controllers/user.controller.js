import { User, User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register  

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            })
        }

        const User = await User.findOne({ email });

        if (User) {
            return res.status(400).json({
                message: "User already exist with this email",
                success:false,
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "Account created SuccessFully",
            success: true,
        });

    } catch (error) {
        console.log("Register Error from User-controller",error);
    }
}

// Login 

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }
        
        const User = await User.findOne({ email });
        if (!User) {
            return res.status(400).json({
                message: "Incorrect email and password",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, User.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email and password ",
                success: false,
            })
        }

        if (role !== User.role){
            return res.status(400).json({
                message: "Account does't exist with current role",
                success: false,
            })
        }

        const tokenData = {
            userId: User._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        User = {
            _id: User._id,
            fullname: User.fullname,
            email: User.email,
            phoneNumber: User.phoneNumber,
            role: User.role,
            profile: User.profile,
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: "strict" }).json({
            message: `Welcome back ${User.fullname}`,
            User,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

// Logout

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

