export default (sequelize, DataTypes) => {
  const Resources = sequelize.define("Resources", {
    // name, type, capacity, status, description, image

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("available", "unavailable"),
      defaultValue: "available",
      allowNull: false,
      validate: {
        isIn: {
          args: [["available", "unavailable"]],
          msg: "Status can either be 'available' or 'unavailable'",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });


  return Resources;
};
