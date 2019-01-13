const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  // res.send('login');
  res.render('login');
});

router.get('/register', (req, res) => {
  // res.send('Register');
  res.render('register');
});

router.post('/register', (req, res) => {
  console.log(req)
  const { name, email, password, password2 } = req.body;
  const errors = [];

  if(!name || !email || !password || !password2){
    errors.push({message: 'Please fill all the fields'});
  }

  if(password != password2){
    errors.push({message: 'Password donot match'});
  }

  if(password.length < 6){
    errors.push({message: 'Password should be atleast 6 charecters'});
  }

  if(errors.length > 0){
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  }else{
    res.send('pass');
  }

});

router.get('/dashboard', (req, res) => {
  // res.send('Register');
  res.render('dashboard');
});

module.exports = router;