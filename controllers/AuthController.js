import db from "../models/index.js";
import bcrypt from "bcryptjs";

const Users = db.Users;

//register controller
export const register = async (req, res) => {
  try {
    const { name, email, password, department, role } = req.body;

    const existingUser = await Users.findOne({where: {email}});

    if(existingUser) {
        return res.status(409).json({message: "A user with this email already exist"});
    }

   const hash =  await bcrypt.hash(password, 10)
    
    await Users.create({
        name,
        email,
        password: hash,
        department,
        role,
      });

     res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError" ){
        return res.status(400).json({message: error.errors[0].message})
    }

    res.status(500).json({ error: error.message });
  }
};
