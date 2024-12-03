import express from "express";
import { body } from "express-validator";
import { userRegister } from "../controller/user.controller.js";

const userRoutes = express.Router();

// regiser
userRoutes.post(
    "/register",
    body("email").isEmail().withMessage("Invalid Email Address"),
    /* In the provided JavaScript code snippet, `body("fullName")` is a part of the Express-validator
    middleware used for validating the request body parameters. */
    /* `body("fullName")` is a part of the Express-validator middleware used for validating the request
    body parameters. In this specific case, it is validating the "fullName" field in the request
    body. The validation rule specified for "fullName" is that it must be at least 3 characters
    long. If the validation fails, an error message "Full name must be at least 3 characters long"
    will be returned. */
    body("fullName")
        .isLength({ min: 3 })
        .withMessage("Full name must be at least 3 characters long"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
   
    userRegister
);


//login

export default userRoutes;
