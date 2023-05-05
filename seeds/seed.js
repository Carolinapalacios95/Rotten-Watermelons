// changed file name to js as we using this to seed
const sequelize = require('../config/connection');
const { User, Movie, Review} = require('../models');


const userData = require('./userData.json');
const movieData = require('./movieData.json');
const reviewData = require('./reviewData.json');
// const genreData = require('./genreData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Movie.bulkCreate(movieData);

  await Review.bulkCreate(reviewData);
  // await Genre.bulkCreate(genreData);

  process.exit(0);
};

seedDatabase();

