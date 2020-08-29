const colors = require('colors');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const authRoute = require('./Routes/authRoute');

app.use('/auth',authRoute);


app.listen(5555,console.log(`Server is running`.red.bgGreen));

