import db from "../models/index.js";

const Users = db.Users;

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are forbidden to carry out this operation" });
    }

    const queryFilters = req.query;

    const allUsers = await Users.findAll({
      where: queryFilters,
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({ message: "Success", data: allUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// approve user

//reject user

//revoke user
