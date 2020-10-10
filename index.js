const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');
const { Journals, Users, Trips } = require('./database/db');
const { getUser } = require('./database/db');
require('./passport-setup');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
  createParentPath: true,
}));
// app.use(express.json());
app.use(cookieSession({
  name: 'ontheroadagain',
  keys: ['key1', 'key2'],
}));

app.use(passport.initialize());
app.use(passport.session());

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

// Example protected and unprotected routes
// app.get('/', (req, res) => res.send('Example Home page!'))
app.get('/failed', (req, res) => res.send('You Failed to log in!'));

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', isLoggedIn, (req, res) => {
  res.redirect('/#/login');
});

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/good');
  });

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

app.get('/api/trips', (req, res) => {
  Trips.findAll()
    .then((trips) => res.send(trips));
});

app.post('/api/trips/', (req, res) => {
  const newTrip = req.body;
  Trips.create(newTrip)
    .then(() => res.status(201).send());
});

app.get('/api/savedTrip/:id', (req, res) => {
  const { id } = req.params;
  Trips.findOne({ where: { id } })
    .then((tripData) => res.send(tripData));
});

app.get('/api/journals', (req, res) => {
  Journals.findAll()
    .then((result) => res.status(200).send(result));
});

app.post('/api/journals', (req, res) => {
  const journalObj = req.body;
  Journals.create(journalObj)
    .then(() => {
      res.status(200).send();
    });
});

app.post('/api/fileUpload', (req, res) => {
  // const {user} = req;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const dir = path.join(__dirname, '/images/userImages');

  if (!fs.existsSync(dir)) {
    // console.log('the path does not exist');
    fs.mkdirSync(dir, (err) => {
      if (err) {
        return console.error(err);
      }
      return 'success';
      // console.log('Directory created successfully');
    });
  }
  // to be updated with googleID / userID
  const userName = '1245674548756';

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const sampleFile = req.files.files;
  // imageFile.mv(`./images/userImages/${imageFile.name}`, (err) => {
  //   if(err) {res.sendStatus(500).send(err)}
  //   res.sendStatus(201).send('File Uploaded Successfully')
  // })
  // Use the mv() method to place the file somewhere on your server
  const fileNameArray = sampleFile.name.split('.');
  fileNameArray[0] = userName;

  sampleFile.mv(`./images/userImages/${fileNameArray.join('.')}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return 'success';
  });
  return res.send('File uploaded!');
});

app.get('/user/profile', (req, res) => {
  getUser(req.user.googleId).then((data) => res.send(data)).catch((err) => console.error(err));
});

app.get('/api/trip/:id', (req, res) => {
  const { id } = req.params;

  Users.findOne({ where: { id }, include: [Trips] }).then((data) => res.send(data));
});

app.get('/api/journal/:id', (req, res) => {
  const { id } = req.params;

  Trips.findOne({ where: { id }, include: [Journals] }).then((data) => res.send(data));
});
