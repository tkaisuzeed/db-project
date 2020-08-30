const colors = require('colors');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const authRoute = require('./Routes/authRoute');
const reserveRoute = require('./Routes/reserveRoute');

app.use('/auth',authRoute);
app.use('/reserve',reserveRoute);



app.listen(5555,console.log(`Server is running`.red.bgGreen));

