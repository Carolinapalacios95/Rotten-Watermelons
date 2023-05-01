const User = require('./User');
const Review = require('./Review');
const Movie = require('./Movie')
const Genre = require('./Genre')

User.hasMany(Review, {
    foreignkey: 'user_id',
});

Review.belongsTo(User, {
    foreignkey: 'user_id',
});

Movie.hasMany(Review, {
    foreignkey: 'movie_id'
});

Review.belongsTo(Movie, {
    foreignKey: 'movie_id'
});

Genre.hasMany(Movie, {
    foreignKey: 'genre_id'
});

Movie.belongsTo(Genre, {
    foreignKey: 'genre_id'
});










module.exports = { User, Review, Movie, Genre };
