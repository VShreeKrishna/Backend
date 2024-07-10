import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js"; // Import the app instance

dotenv.config({
    path: './env'
});

connectDB()
    .then(() => {
        const port = process.env.PORT || 8000; // Change the port here
        app.listen(port, () => {
            console.log(`server is running at :${port}`);
        });
    })
    .catch((err) => {
        console.log("MONGO Db CONNECTION FAILED!!", err);
    });