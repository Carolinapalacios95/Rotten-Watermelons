const router = require('express').Router();

// add the additional table data in the {tableExample, User}
const { User, Movie, Review } = require('../models');
const { getAttributes } = require('../models/User');
const withAuth = require('../utils/auth');


 router.get('/', async (req, res) => {
  try {
    const movieData = await Movie.findAll({

    });

    const movies = movieData.map((movie) => movie.get({ plain: true }));

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



// get back to this
router.get('/api/movies/', async (req, res)=>{
  const movieData = await Movie.findAll()
})


router.get('/api/movies/:id', async (req, res)=>{
  const movieData = await Movie.findByPk(req.params.id,{
    include: [
      {
        model: User,
      attributes: ['username']
    },
    {
      model: Review,
      attributes: ['title','description', 'rating']
    }
      ]

  })
})
router.get('/api/movies', withAuth, (req, res)=>{
  res.render('leavereview', {
    ...User,
    logged_in: true
  })
})
module.exports = router;
