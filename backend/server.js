const express = require('express');
const cors = require('cors');
const mysql = require('./connection');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const carRouter = require('./routes/cars');
const workerRouter = require('./routes/workers');
const jobRouter = require('./routes/jobs');
const workerCarRouter = require('./routes/workerCars');
const loginRouter = require('./routes/login')

app.use('/cars', carRouter);
app.use('/workers', workerRouter);
app.use('/jobs', jobRouter);
app.use('/car/history', workerCarRouter);
app.use('/login', loginRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
