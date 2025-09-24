const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const companyRoutes = require('./routes/companyRoutes');

// --- Database Connection ---
connectDB();

// --- Initialize Express App ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware Setup ---
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Companies API is running successfully!');
});

app.use('/api/companies', companyRoutes);

app.listen(PORT, () => {
    console.log(`Server is active and listening on port: ${PORT}`);
});