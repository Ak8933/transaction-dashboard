const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.get('/transactions', async (req, res) => {
    try {
        const { month } = req.query;

        let query = {};
        if (month && month !== 'All') {
            const monthIndex = new Date(Date.parse(month + " 1, 2000")).getMonth() + 1;
            query = {
                $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] }
            };
        }

        const transactions = await Transaction.find(query);
        res.status(200).json({ transactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Error fetching transactions.' });
    }
});

module.exports = router;
