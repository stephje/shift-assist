const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.sahe7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error(err))

app.get('/', (req, res) => {
    res.send('Hello from the other siiiiide~');
});

app.listen(4000, () => {
    console.log('Server listening on port 4000')
})