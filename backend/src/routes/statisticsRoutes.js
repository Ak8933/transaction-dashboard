// src/routes/statisticsRoutes.js
const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.get('/statistics', async (req, res) => {
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

        

        const totalSaleAmount = transactions.reduce((acc, transaction) => acc + transaction.price, 0);
        const totalSoldItems = transactions.filter(transaction => transaction.sold).length;
        const totalNotSoldItems = transactions.length - totalSoldItems;

        res.status(200).json({
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ message: 'Error fetching statistics.' });
    }
});

module.exports = router;
