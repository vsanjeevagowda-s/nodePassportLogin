const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

const db = require('./config/keys').MondoURI;

// Views
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body parser
app.use(express.urlencoded({extended: false}));

// Mongodb connection
mongoose.connect(db, {useNewUrlParser: true})
.then(resp => console.log('mongo db connected...', resp))
.catch(err => console.log('error=>', err));


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// Server
app.listen(3000, console.log(`Server started in port : ${PORT}`));