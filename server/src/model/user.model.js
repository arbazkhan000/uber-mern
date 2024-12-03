import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"],
        },
        lastName: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 characters long"],
    },
    password: {
        type: String,
        required: true,
        select: false, // Don't include password in queries by default
    },
});

// Method to generate JWT token
userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
    });
};

// Method to hash the password
userSchema.methods.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10); // You can adjust salt rounds as needed
    return bcrypt.hash(password, salt);
};

// Method to compare hashed password
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export { User };
