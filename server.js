//Import express
const express = require('express')
const path = require('path');
const fs = require('fs');
const dbNotes = require('./db/db.json');

const PORT = process.env.PORT ||3001;

const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var currentID = dbNotes.length+1;

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
    const { title, text } = req.body;

    if (req.body) {
        // Variable for the note we're saving
        const newNote = {
            id: currentID,
            title,
            text,
        };
            
        // Add a new note
        dbNotes.push(newNote);
        fs.writeFileSync(path.join(__dirname,'db/db.json'),JSON.stringify(dbNotes, null, 2),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
        
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

app.delete("/api/notes/:id",(req, res) => {
  for(let i=0;i<dbNotes.length;i++){
      if(dbNotes[i].id==req.params.id){
          dbNotes.splice(i,1);
          break;
      }
  }
  //Update the file
  fs.writeFileSync(path.join(__dirname,'db/db.json'),JSON.stringify(dbNotes),err => {
      if (err) {
          return console.log(err);
      } else {
          console.log("Deleted!");
      }
  });
  res.json(dbNotes);
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//To initialize the server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}/`)
);