const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.post('/login', (req, res) => {
  console.log("Hitting User Login End Point");
  res.end();
});

app.post('/register', (req, res) => {
  console.log('Hitting User Registration Routes');
  res.end();
});

app.listen(3000, () => console.log('Listening on 3000'));
