const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Define a simple route for loans
router.get('/', (req, res) => {
    res.send('Loans route');
});

module.exports = router;