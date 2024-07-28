// src/routes/combinedDataRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const baseURL = 'http://localhost:5000/api';

router.get('/combined-data', async (req, res) => {
    try {
        const { month } = req.query;
        if (!month) {
            return res.status(400).json({ message: 'Month is required' });
        }

        // Fetch data from the three APIs concurrently
        const [statsResponse, pieChartResponse, barChartResponse] = await Promise.all([
            axios.get(`${baseURL}/statistics`, { params: { month } }),
            axios.get(`${baseURL}/pie-chart`, { params: { month } }),
            axios.get(`${baseURL}/bar-chart`, { params: { month } }),
        ]);

        // Combine the responses
        const combinedData = {
            statistics: statsResponse.data,
            pieChart: pieChartResponse.data,
            barChart: barChartResponse.data,
        };

        res.status(200).json(combinedData);
    } catch (error) {
        console.error('Error fetching combined data:', error);
        res.status(500).json({ message: 'Error fetching combined data.' });
    }
});

module.exports = router;
