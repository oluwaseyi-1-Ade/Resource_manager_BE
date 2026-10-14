export default (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    resourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("confirmed", "cancelled", "completed"),
      allowNull: false,
      defaultValue: "confirmed",
    },
    attendance: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    cancelledAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    cancelledById: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
    },
  });

  return Booking;
};
