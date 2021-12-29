const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

//allows files that needs access to public, the ability to grab any file
app.use(express.static('public'));

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

//parse incoming JSON data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server open on port ${PORT}`);
})