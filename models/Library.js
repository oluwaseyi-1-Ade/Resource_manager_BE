export default (sequelize, DataTypes) => {
  const Library = sequelize.define("Library", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    course: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.ENUM('computer science','cyber security', 'information system'),
      allowNull: false,
      validate: {
        isIn:  {
          args: [["computer science", "cyber security", "information system"]],
          msg: 'Invalid department. Please select Computer Science, Cyber Security, or Information System.'
        }}
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    uploadedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    fileType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING(2083),
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileSize: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

  }, {
    tableName: 'LibraryMaterials'
  });

  return Library;
};
