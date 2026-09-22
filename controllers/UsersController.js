import db from "../models/index.js";

const Users = db.Users;

//get all users
export const getAllUsers = async (req, res) => {
  try {

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
      users: allUsers,
      pagination: {
        total: count,
        totalPages: Math.ceil(count / limitInt),
        currentPage: pageInt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// approve user
export const approveUser = async (req, res) => {
  try {
    // get the id from the req params 
    const userId = req.params.id;
    //check if user exist then change status
    const existingUser = await Users.findByPk(userId);

    if(!existingUser){
      return res.status(404).json({message: "User not registered"})
    }

    const newStatus = await existingUser.update({status: "approved"});

    res.status(200).json({message: "User Approved successfully", user: newStatus});

  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

//reject user
export const rejectUser = async (req, res) => {
  try {
    const userId = req.params.id;

   const deletedCount = await Users.destroy({where: {id: userId}});

   if(deletedCount === 0) {
    return res.status(404).json({message: "User not found"});
   }

    res.status(200).json({message: "User rejected succesfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

//revoke user
export const revokeUser = async (req, res) => {
  try {
    const userId = req.params.id;

   const revokedCount = await Users.destroy({where: {id: userId}});

   if(revokedCount === 0) {
    return res.status(404).json({message: "User not found"});
   }

    res.status(200).json({message: "User revoked succesfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}
