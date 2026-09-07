import express from "express";
import { config } from "dotenv";


const app = express();

config();




app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})