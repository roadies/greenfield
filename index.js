const express = require('express');

const path = require('path');

const app = express();

app.use('/dist', express.static(path.join(__dirname, '/dist')));

app.listen(8080, () => {
  console.info('Server is listening on port 8080');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
