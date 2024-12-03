import http from "http";
import app from "./app.js";
import dbConnect from "./src/db/db.js";

const port = process.env.PORT || 3000;

const Server = http.createServer(app);

Server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    dbConnect();
});
