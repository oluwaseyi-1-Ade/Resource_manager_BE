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
import bookingModel from './Booking.js'
import LibraryModel from './Library.js';

// 2. Initialize your models
db.Users = userModel(sequelize, Sequelize.DataTypes);
db.Resources = resourceModel(sequelize, Sequelize.DataTypes);
db.Bookings = bookingModel(sequelize, Sequelize.DataTypes);
db.Library = LibraryModel(sequelize, Sequelize.DataTypes);


// --- ASSOCIATIONS ---
// 1. User <-> Booking
db.Users.hasMany(db.Bookings, { foreignKey: 'userId', as: 'bookings', onDelete: 'CASCADE' });
db.Bookings.belongsTo(db.Users, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });

// 2. Resource <-> Booking
db.Resources.hasMany(db.Bookings, { foreignKey: 'resourceId', as: 'bookings', onDelete: 'CASCADE' });
db.Bookings.belongsTo(db.Resources, { foreignKey: 'resourceId', as: 'resource', onDelete: 'CASCADE' });

//3 Library <-> User
db.Users.hasMany(db.Library, {foreignKey: 'userId', as:'materials', onDelete: 'CASCADE'});
db.Library.belongsTo(db.Users, {foreignKey: 'userId', as:'user', onDelete: 'CASCADE'});



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