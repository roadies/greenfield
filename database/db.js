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
  start_date: Sequelize.STRING,
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

Trips.belongsTo(Users, {
  onDelete: 'cascade',
  foreignKey: { name: 'userId', allowNull: true, onDelete: 'cascade' },
  as: '_id',
});

const Campsites = sequelize.define('Campsites', {
  name: Sequelize.STRING,
  facility: Sequelize.STRING,
  organization: Sequelize.STRING,
  description: Sequelize.TEXT,
  latitude: Sequelize.FLOAT,
  longitude: Sequelize.FLOAT,
  tripId: Sequelize.INTEGER,
});

Campsites.belongsTo(Trips, {
  foreignKey: { name: 'tripId', allowNull: true, onDelete: 'cascade' },
  as: '_id',
  onDelete: 'cascade',
});

const Journals = sequelize.define('Journals', {
  tripId: Sequelize.INTEGER,
  date: Sequelize.DATE,
  location: Sequelize.STRING,
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
  imageLink: Sequelize.STRING,
});

Journals.belongsTo(Trips, {
  onDelete: 'cascade',
  foreignKey: { name: 'tripId', allowNull: true, onDelete: 'cascade' },
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
  .then(() => console.info('database & tables created'))
  .catch((err) => console.error('err in sync', err));

// Associations
Users.hasMany(Trips, { foreignKey: 'userId', allowNull: true, onDelete: 'cascade' });
Trips.belongsTo(Users, { foreignKey: 'userId', allowNull: true, onDelete: 'cascade' });

Trips.hasMany(Campsites, { foreignKey: 'tripId', allowNull: true, onDelete: 'cascade', hooks: true });
Campsites.belongsTo(Trips, { onDelete: 'cascade', foreignKey: 'tripId', allowNull: true });

Trips.hasMany(Journals, { foreignKey: 'tripId', onDelete: 'cascade' });
Journals.belongsTo(Trips, { foreignKey: 'tripId', onDelete: 'cascade' });

Journals.hasMany(Images, { foreignKey: 'journalId', onDelete: 'cascade' });

Images.belongsTo(Journals, { foreignKey: 'journalId', onDelete: 'cascade' });

// database functions
const getUser = (id) => Users.findOne({ where: { googleId: id } });

module.exports = {
  Users,
  Trips,
  Campsites,
  Journals,
  Images,
  getUser,
};
