import db from "../models/index.js";

const Bookings = db.Bookings;

export const getAllBookings = async (req, res) => {
  try {
    const { limit = 10, user:userId } = req.query;
    const limitInt = parseInt(limit);

    const { count, rows: bookingsData } = await Bookings.findAndCountAll({
      limit: limitInt, where:{ userId: userId},
      include: [
        {
          model: db.Users,
          as: 'user', // Must match the 'as' string in your index.js association
          attributes: ['id', 'name', 'email', 'department', 'role'] // Excludes passwords and sensitive data
        },
        {
          model: db.Resources,
          as: 'resource',
          attributes: ['id', 'name', 'type', 'capacity'] // Pull only the resource fields you need
        }
      ]
    });

    res.status(200).json({ message: "success", data: bookingsData || [], count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// http://localhost:5001/bookings/public?date=2026-10-14&limit=1000
//check booking availability
export const bookingSchedule = async(req, res) => {
 try {
    const {date, limit} = req.query;
    const limitInt = parseInt(limit);

    const {count, rows: publicData} = await Bookings.findAndCountAll({limit: limitInt, where: {date: date}, include: [
              {
          model: db.Users,
          as: 'user', // Must match the 'as' string in your index.js association
          attributes: ['id', 'name', 'email', 'department', 'role'] // Excludes passwords and sensitive data
        }
    ]});

    // Format the data to exactly match the old frontend's expectations
    const formattedData = publicData.map(booking => {
      const plainBooking = booking.toJSON(); // Convert Sequelize instance to plain JS object
      
      // Overwrite the 'resource' key with the string ID the frontend overlap checker needs
      plainBooking.resource = String(plainBooking.resourceId); 
      
      return plainBooking;
    });

    res.status(200).json({message:"success", data: formattedData || [] });
 } catch (error) {
        res.status(500).json({ message: error.message });
 }
}

export const createBooking = async(req, res) => {
 try {
    const {course, date, department, startTime, endTime, notes, resource:resourceId, userId} = req.body;

    const newBooking = await Bookings.create({course, date, department, startTime, endTime, notes, resourceId, userId});

    res.status(201).json({message: "Booking created successfully", data: newBooking});
 } catch (error) {
    res.status(500).json({ message: error.message });
 }
}

export const cancelBooking = async(req, res) => {
    try {
        const bookingId = req.params.id;

       await Bookings.destroy({where: {id: bookingId}});

        res.status(202).json({message: "Booking cancelled successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
