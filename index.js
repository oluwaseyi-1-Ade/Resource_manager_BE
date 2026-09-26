import express from "express";
import 'dotenv/config'
// import { config } from "dotenv";
import db from "./models/index.js";
import cors from 'cors';

const app = express();

// config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server working fine" });
});

import AuthRouter from './routes/AuthRouter.js'
import UsersRouter from './routes/UsersRouter.js'
import ResourcesRouter from "./routes/ResourcesRouter.js";
import { validateToken } from "./middlewares/AuthMiddleware.js";
import { uploadResourceImage } from "./controllers/ResourcesController.js";
import { upload } from "./middlewares/MulterMiddleware.js";

app.use('/auth', AuthRouter);
app.use('/users', UsersRouter);
app.use('/resources', ResourcesRouter);
//upload resource image
app.post('/upload-image', validateToken, upload.single('image'), uploadResourceImage);

db.sequelize
  .sync() /// remove { alter: true } for prod
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });
