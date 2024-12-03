import mongoose from "mongoose";

function dbConnect() {
    mongoose
        .connect(process.env.DATABSE_URL)
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => console.log(err));
}


export default dbConnect;