const express = require('express');
const fs = require('fs');
// const api = require('./routes/index.js');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

//middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));


//GET route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//get route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
  );