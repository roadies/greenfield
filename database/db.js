const { Sequelize } = require('sequelize');

const DB_NAME = 'pavement';
const DB_USER = 'root';
const DB_PASS = '';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: 'mysql',
  logging: false,
});

const Users = sequelize.define('Users', {
  googleId: Sequelize.STRING,
  name: Sequelize.STRING,
});

const Trips = sequelize.define('Trips', {
  name: Sequelize.STRING,
  location_start: Sequelize.STRING,
  location_end: Sequelize.STRING,
  longitude_start: Sequelize.FLOAT,
  latitude_start: Sequelize.FLOAT,
  longitude_end: Sequelize.FLOAT,
  latitude_end: Sequelize.FLOAT,
  trip_duration: Sequelize.INTEGER,
  trip_distance: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  completed: Sequelize.BOOLEAN,
});

Trips.belongsTo(Users, {
  foreignKey: 'userId',
  as: '_id',
});

const Journals = sequelize.define('Journals', {
  tripId: Sequelize.INTEGER,
  date: Sequelize.DATE,
  location: Sequelize.STRING,
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
});

Journals.belongsTo(Trips, {
  foreignKey: 'tripId',
  as: '_id',
});

const Images = sequelize.define('Images', {
  journalId: Sequelize.INTEGER,
  path: Sequelize.STRING,
});

Images.belongsTo(Journals, {
  foreignKey: 'journalId',
  as: '_id',
});

sequelize.sync()
  .then(() => console.log('database & tables created'))
  .catch((err) => console.log('err in sync', err));

// Associations
Users.hasMany(Trips, { foreignKey: 'userId' });
Trips.belongsTo(Users, { foreignKey: 'userId' });

Trips.hasMany(Journals, { foreignKey: 'tripId' });
Journals.belongsTo(Trips, { foreignKey: 'tripId' });

// database functions
const getUser = (id) => Users.findOne({ where: { googleId: id } });

module.exports = {
  Users,
  Trips,
  Journals,
  Images,
  getUser,
};
