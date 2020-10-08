const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const { Journals } = require('./database/db');
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

// const isLoggedIn = (req, res, next) => {
//   console.log(req.user, '<=== req.user');
//   if (req.user) {
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// };

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
// app.get('/good', isLoggedIn, (req, res) => {
//   console.log(req.user);
//   res.send(`Welcome mr ${req.user.name}!`)})

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/#/profile');
  });

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
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
  });
  return res.send('File uploaded!');
});
