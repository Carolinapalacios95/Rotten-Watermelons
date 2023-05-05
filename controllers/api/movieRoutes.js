const router = require('express').Router();
const { User, Review, Movie } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res)=>{
  const movieData = await Movie.findAll()
});

router.post('/:id', withAuth, async (req, res)=>{
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

router.get('/:id', withAuth, async (req, res)=>{
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

  module.exports = router;