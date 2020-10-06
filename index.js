const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./passport-setup');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.json());
app.use(cookieSession({
  name: 'ontheroadagain',
  keys: ['key1', 'key2'],
}));


app.use(passport.initialize());
app.use(passport.session());


const isLoggedIn = (req, res, next) => {
  console.log(req.user, '<=== req.user');
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use('/dist', express.static(path.join(__dirname, '/dist')));

app.listen(8080, () => {
  console.info('Server is listening on port 8080');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Example protected and unprotected routes
// app.get('/', (req, res) => res.send('Example Home page!'))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
// app.get('/good', isLoggedIn, (req, res) => {
//   console.log(req.user);
//   res.send(`Welcome mr ${req.user.name}!`)})

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/#/profile');
  }
);

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});
