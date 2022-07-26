//Import express
const express = require('express')

const PORT = 3001;

const app = express();

//To initialize the server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}/`)
);