const router = require('express').Router();
const { User, Movie, Review } = require('../../models');
const express = require('express');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res)=>{
    res.render('leavereview', {
      ...User,
      logged_in: true
    })
})


module.exports = router;
