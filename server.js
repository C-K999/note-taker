//Import express
const express = require('express')

const path = require('path');

const fs = require('fs');

const dbNotes = require('./db/db.json');

const PORT = process.env.PORT ||3001;

const app = express();

// Route to the notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__filename, '/db/db.json'))

);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//To initialize the server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}/`)
);