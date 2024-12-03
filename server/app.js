import cors from "cors";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

// routes
import userRoutes from "./src/routes/user.routes.js";

//

app.use("/api/v1", userRoutes);
export default app;
