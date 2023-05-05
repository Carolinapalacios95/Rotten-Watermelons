const User = require('./User');
const Review = require('./Review');
const Movie = require('./Movie');


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


module.exports = {User, Review, Movie};
