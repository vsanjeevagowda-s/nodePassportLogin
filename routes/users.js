const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  // res.send('login');
  res.render('login');
})

router.get('/register', (req, res) => {
  // res.send('Register');
  res.render('register');
})

router.get('/dashboard', (req, res) => {
  // res.send('Register');
  res.render('dashboard');
})

module.exports = router;