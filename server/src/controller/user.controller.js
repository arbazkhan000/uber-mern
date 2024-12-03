import { validationResult } from "express-validator";
import { User } from "../model/user.model.js";

const userRegister = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty)
            return res.status(400).json({
                errors: errors.array(),
            });

        const { fullname, email, password } = req.body;
        const { firstName, lastName } = fullname || {};

        if (!firstName || !lastName || !email || !password)
            return res.status(404).json({
                message: "Please fill in all fields",
                success: false,
            });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
                success: false,
            });
        }

        const newUser = new User({
            fullname: {
                firstName,
                lastName,
            },
            email,
            password,
        });

        newUser.password = await newUser.hashPassword(password);

        await newUser.save();

        const token = await newUser.generateToken();

        res.status(201).json({
            message: "User created successfully",
            success: true,
            user: newUser,
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message,
            success: false,
        });
    }
};

// login

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(404).json({
                message: "Email and password are required",
                success: false,
            });

        const userExisting = await User.findOne({ email });

        if (!userExisting)
            return res.status(400).json({
                message: "User allready exist",
                success: false,
            });

        const comparedPassword = await User.comparePassword(password);
        if (!comparedPassword)
            return res.status(400).json({
                message: "Password not found",
                success: false,
            });

        res.staus(200).json({
            message: "User logged in successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message,
            success: false,
        });
    }
};

export { userRegister };
