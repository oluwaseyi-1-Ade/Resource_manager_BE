export default (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        isLautechEmail(value) {
          if (!value.endsWith("lautech.edu.ng")) {
            throw new Error(
              "Access restricted: You must use a valid lautech email address.",
            );
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.ENUM(
        "computer science",
        "cyber security",
        "information system",
      ),
      allowNull: false,
      validate: {
        isIn: {
          args: [[  "computer science",
        "cyber security",
        "information system"]],
        msg: "Invalid department. Please select Computer Science, Cyber Security, or Information System."
        }
      }
    },
    role: {
      type: DataTypes.ENUM("admin", "staff", "classrep"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("approved", "pending"),
      defaultValue: "pending",
      allowNull: false,
    },
  });

  return Users;
};
