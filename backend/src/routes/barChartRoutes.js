// src/routes/barChartRoutes.js
const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.get('/bar-chart', async (req, res) => {
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

        const priceRanges = {
            "0-100": 0,
            "101-200": 0,
            "201-300": 0,
            "301-400": 0,
            "401-500": 0,
            "501-600": 0,
            "601-700": 0,
            "701-800": 0,
            "801-900": 0,
            "901-above": 0
        };

        transactions.forEach(transaction => {
            const price = transaction.price;
            if (price <= 100) priceRanges["0-100"]++;
            else if (price <= 200) priceRanges["101-200"]++;
            else if (price <= 300) priceRanges["201-300"]++;
            else if (price <= 400) priceRanges["301-400"]++;
            else if (price <= 500) priceRanges["401-500"]++;
            else if (price <= 600) priceRanges["501-600"]++;
            else if (price <= 700) priceRanges["601-700"]++;
            else if (price <= 800) priceRanges["701-800"]++;
            else if (price <= 900) priceRanges["801-900"]++;
            else priceRanges["901-above"]++;
        });

        res.status(200).json(priceRanges);
    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        res.status(500).json({ message: 'Error fetching bar chart data.' });
    }
});

module.exports = router;
