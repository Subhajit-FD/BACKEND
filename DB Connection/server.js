const express = require('express');

const connectDb = require('./src/db/db');

connectDb(); // Connect to the database

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});