const router = require('express').Router();

// add the additional table data in the {tableExample, User}
const { User, Movie, Review } = require('../models');
// const { getAttributes } = require('../models/User');
const withAuth = require('../utils/auth');


 router.get('/', withAuth, async (req, res) => {
  try {
    const MovieData = await Movie.findAll();

    const movies = MovieData.map((movie) => movie.get({ plain: true }));

    res.render('homepage', {
      movies,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
 });

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if(req.session.logged_in){
    res.redirect('/login')
  }
  res.render('signup');
});

module.exports = router;
