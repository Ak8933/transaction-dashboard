const express = require('express');
const axios = require('axios');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.get('/initializeDB', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;

        // Clear existing data
        await Transaction.deleteMany({});

        // Insert new data
        await Transaction.insertMany(data);

        res.status(200).json({ message: 'Database initialized with seed data.' });
    } catch (error) {
        console.error('Error initializing database:', error);
        res.status(500).json({ message: 'Error initializing database.' });
    }
});

module.exports = router;
