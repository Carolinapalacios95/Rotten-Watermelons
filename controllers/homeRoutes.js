const router = require('express').Router();
const { User, Movie, Review } = require('../models');
const withAuth = require('../utils/auth');

// Get all reviews and JOIN with user & movie data
router.get('/reviews', withAuth, async (req, res)=>{
  try {

    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Movie,
          attributes: ['title', 'poster_image'],
        }
      ],
    });

    // Serialize data so the template can read it
    const reviews = reviewData.map((review) => review.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('viewAll', {
      reviews,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all movies and JOIN with user & review data
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

 // Route to Login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('logIn');
});

//Get movie by Id so that user can leave a review for a specific movie
router.get('/movies/:id', withAuth, async (req, res)=>{
  const movieData = await Movie.findByPk(req.params.id,{
    include: [
    {
      model: Review,
      attributes: ['title','description', 'rating'],
      include: [
          {
            model: User,
          attributes: ['username']
        },
      ]
    }
      ]
  });
  const movie = movieData.get({ plain: true });

  res.render('leaveReview', {
    ...movie,
    logged_in: req.session.logged_in
  });
});

router.post('/movies/:id', withAuth, async (req, res)=>{
  console.log("incoming request")
  try {
    const newReview = await Review.create({
      title: req.body.title,
      description: req.body.description,
      rating: req.body.rating,
      user_id: req.session.user_id,
    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to Signup page
router.get('/signup', (req, res) => {
  if(req.session.logged_in){
    res.redirect('/login')
  }
  res.render('signUp');
});

module.exports = router;
