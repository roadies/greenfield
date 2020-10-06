const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport-setup');

const app = express();

// Middleware

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
  name: 'ontheroadagain',
  keys: ['key1', 'key2'],
}));

const isLoggedIn = (req, res, next) => {
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

app.get('/out', (req, res) => res.send('You are logged out!'));
app.get('/failed', (req, res) => res.send('You failed to log in!'));
app.get('/good', (req, res) => {
  res.send(`Welcome mr ${req.body.displayName}`);
});

app.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/good');
  });

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/out');
});
