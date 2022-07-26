//Import express
const express = require('express')

const path = require('path');

const fs = require('fs');

const dbNotes = require('./db/db.json');

const PORT = process.env.PORT ||3001;

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Route to the notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Getting the notes
app.get('/api/notes', (req, res) => {
    console.log(dbNotes);
    res.json(dbNotes);
    console.info(`${req.method} request received to get notes`);
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { id, title, text } = req.body;

    if (title && text) {
        // Variable for the note we're saving
        const newNote = {
            id,
            title,
            text,
        };
    
        // Obtain existing notes
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
          if (err) {
            console.error(err);
          } else {
            // Convert string into JSON object
            const parsedNotes = JSON.parse(data);
    
            // Add a new note
            parsedNotes.push(newNote);
            notes = parsedNotes;
            fs.writeFile(
              './db/db.json',
              JSON.stringify(parsedNotes, null, 4),
              (writeErr) =>
                writeErr
                  ? console.error(writeErr)
                  : console.info('Successfully updated notes!')
            );
          }
        });
    
        const response = {
          status: 'success',
          body: newNote,
        };
    
        console.log(response);
        res.json(response);
      } else {
        res.json('Error in posting note');
      }

});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//To initialize the server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}/`)
);