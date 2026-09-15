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

    // Extract page and limit (with defaults), put the rest into queryFilters
    const { page = 1, limit = 10, ...queryFilters } = req.query;

    // Convert them to numbers (URL queries are always strings by default)
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);

    //  calculate ofset- number of items to skip
    const offset = (pageInt - 1) * limitInt;

    const { count, rows: allUsers } = await Users.findAndCountAll({
      where: queryFilters,
      limit: limitInt,
      offset: offset,
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({
      message: "Success",
      data: allUsers,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limitInt),
        currentPage: pageInt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// approve user

//reject user

//revoke user
