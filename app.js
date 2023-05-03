const express = require('express')
const app = express()
const port = 3000
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const moment = require('moment');
app.locals.moment = moment;

require('dotenv').config();

app.use(
    session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: true
    })
);
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


app.use(function (req,res,next){
  res.locals.message = req.flash('message')
  next();
})

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Specify the location of the views folder
app.set('views', './views');


// ROUTING
const router = require('./routes/routes');
app.use(router);

// Controllers
const posts = require('./controllers/posts');
app.use(posts);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})