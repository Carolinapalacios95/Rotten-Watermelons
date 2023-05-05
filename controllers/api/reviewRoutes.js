const router = require('express').Router();
const { User, Movie, Review } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res)=>{
  try {
    // Get all reviews and JOIN with user & movie data
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

module.exports = router;
