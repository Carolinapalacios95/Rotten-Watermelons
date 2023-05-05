const router = require('express').Router();
const {User} = require('../../models');
const bcrypt = require('bcrypt');
const express = require('express');
const session = require("express-session");

//Create a new User
router.post('/signup', async (req, res) => {
  try {
    console.info(req.body);
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

// Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

    });
    res.status(200).json(newUser)
  } catch (err) {
    res.status(400).json(err);
  }
});

// Log new user in if valid userdata & password are found
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      console.log("user not found");
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log("wrong password");
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log("error in user routes: ", err)
    res.status(400).json(err);
  }
});

// Logs out User
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
