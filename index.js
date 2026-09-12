import express from "express";
import { config } from "dotenv";
import db from "./models/index.js";
import cors from 'cors';

const app = express();

config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Message" });
});

import AuthRouter from './routes/AuthRouter.js'
import UsersRouter from './routes/UsersRouter.js'
app.use('/auth', AuthRouter);
app.use('/users', UsersRouter);

db.sequelize
  .sync({ alter: true }) /// remove { alter: true } for prod
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });
