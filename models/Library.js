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
      type: DataTypes.STRING,
      allowNull: false,
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
