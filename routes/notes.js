const notes = require('express').Router();
const { v4: uuidv4 } = require('../helpers/uuid').default;
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const fs = require('fs/promises');

module.exports = notes;

notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

notes.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await fs?.readFromFile('./db/db.json');
        const notes = JSON.parse(data);
        const matchingNote = notes.filter(note => note.id === id);
        if(!matchingNote) {
            res.status(404).send('Note not found');
        } else {
            res.json(matchingNote);
        }
    } catch (error) {
        res.status(500).send('Cannot get note');
    }
});

notes.post('/', (req, res) => {
 console.info(`${req.method} request received to post note`);

 const { title, text } = req.body;
 
 if (title && text) {
     const newNote = {
         title, 
         text, 
         id: uuidv4(),
        };

    readAndAppend(newNote, './db/db.json');

    const response = {
        status: 'success',
        body: newNote,
    };

    res.json(response);
 } else {
    res.json('Error in posting note');
 }
});