// src/routes/pieChartRoutes.js
const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.get('/pie-chart', async (req, res) => {
    try {
        const { month } = req.query;
        if (!month) {
            return res.status(400).json({ message: 'Month is required' });
        }

        const monthIndex = new Date(Date.parse(month + " 1, 2000")).getMonth() + 1;

        const transactions = await Transaction.aggregate([
            {
                $match: {
                    $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] }
                }
            }
        ]);

        const categories = {};

        transactions.forEach(transaction => {
            const category = transaction.category;
            if (!categories[category]) {
                categories[category] = 0;
            }
            categories[category]++;
        });

        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching pie chart data:', error);
        res.status(500).json({ message: 'Error fetching pie chart data.' });
    }
});

module.exports = router;
