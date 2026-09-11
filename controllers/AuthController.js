import db from "../models/index.js";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

const Users = db.Users;
const { sign } = jwt;

config();

//register controller
export const register = async (req, res) => {
  try {
    const { name, email, password, department, role } = req.body;

    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "A user with this email already exist" });
    }

    const hash = await bcrypt.hash(password, 10);

    await Users.create({
      name,
      email,
      password: hash,
      department,
      role,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Users.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const match = await bcrypt.compare(password, existingUser.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // jwt token
    const token = sign(
      {
        email: email,
        id: existingUser.id,
        role: existingUser.role,
        department: existingUser.department,
      },
      process.env.accessTokenSecret,
    );

    // Convert the Sequelize instance to a plain JSON object
    const userData = existingUser.toJSON();

    delete userData.password;

    // login and send user data and jwt
    res
      .status(200)
      .json({
        message: "User logged in successfully",
        token: token,
        user: userData,
      });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    res.status(500).json({ message: error.message });
  }
};
