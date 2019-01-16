const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
  // res.send('login');
  res.render('login');
});

router.get('/register', (req, res) => {
  // res.send('Register');
  res.render('register');
});

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  const errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ message: 'Please fill all the fields' });
  }

  if (password != password2) {
    errors.push({ message: 'Password donot match' });
  }

  if (password.length < 6) {
    errors.push({ message: 'Password should be atleast 6 charecters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    // res.send('pass');
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          errors.push({ message: 'Email is already registered' })
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          })
        } else {
          const newUser = new User({
            name,
            email,
            password,
          });
          bcrypt.genSalt(10, (error1, salt) => {
            bcrypt.hash(password, salt, (error2, hash) => {
              if (error2) {
              } else {
                newUser.password = hash;
                newUser.save()
                  .then(resp => {
                    req.flash('success_msg', 'Registration success');
                    res.redirect('/users/login');
                  })
                  .catch(error3 => {
                    throw error3
                  });
              }
            });
          });
        }
      })
      .catch();

  }

});

router.get('/dashboard', (req, res) => {
  // res.send('Register');
  res.render('dashboard');
});

module.exports = router;