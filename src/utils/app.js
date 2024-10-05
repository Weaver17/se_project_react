const express = require('express');
const mongoose = require('mongoose');

const app = express();

// connect to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/mydb',  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// connect the middleware, routes, etc...

app.listen(3000);