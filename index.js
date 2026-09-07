import express from "express";
import { config } from "dotenv";
import db from "./models/index.js";

const app = express();

config();

app.get("/", (req, res) => {
  res.json({ message: "Message" });
});

db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });
