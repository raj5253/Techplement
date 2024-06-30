require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./router/user.routes');
const quoteRoutes = require('./router/quote.routes');
const connectDB = require("./config/database");

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', quoteRoutes);
app.use('/user', userRoutes);

const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))