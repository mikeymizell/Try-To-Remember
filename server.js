const { db } = require('./db/db');

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/api/notes', (req, res) => {
    res.json(db);
    console.log(db);
})

app.listen(PORT, () => {
    console.log(`API server open on port ${PORT}`);
})