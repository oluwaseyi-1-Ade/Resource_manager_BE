import Sequelize from 'sequelize';
import process from 'process';
import { createRequire } from 'module';

// Setup to allow importing the JSON config file in ES Modules
const require = createRequire(import.meta.url);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const db = {};

// Initialize the database connection
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// 1. Import your models
import userModel from './Users.js';
import resourceModel from './Resources.js'

// 2. Initialize your models
db.Users = userModel(sequelize, Sequelize.DataTypes);
db.Resources = resourceModel(sequelize, Sequelize.DataTypes);

// 3. The Magic Loop (Ready for when you add more models later)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach the connection objects to the db object for easy access
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;