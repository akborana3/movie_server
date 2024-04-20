const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./Routes/telegramRoutes');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

module.exports = app;
