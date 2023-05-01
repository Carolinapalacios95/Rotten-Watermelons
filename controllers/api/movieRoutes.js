const router = require('express').Router();
const { Movie } = require('../../models');
const withAuth = require('../../utils/auth');