const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const dotenv = require('dotenv');
const initializeDBRoutes = require('./routes/initializeDB');
const transactionRoutes = require('./routes/transactionRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const barChartRoutes = require('./routes/barChartRoutes');
const pieChartRoutes = require('./routes/pieChartRoutes');
const combinedDataRoutes = require('./routes/combinedDataRoutes');

//dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/transactionDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', initializeDBRoutes);
app.use('/api', transactionRoutes);
app.use('/api', statisticsRoutes);
app.use('/api', barChartRoutes);
app.use('/api', pieChartRoutes);
app.use('/api', combinedDataRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
