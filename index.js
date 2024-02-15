const express = require('express');
const app = express();
const PORT = 3001;


const cors = require('cors');

app.use(cors());


const routes = require('./Routes/telegramRoutes');

app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
