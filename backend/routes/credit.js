const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

module.exports = (db) => {
    // POST route to save credit score parameters and link with the user
    router.post('/saveCreditScore/:userId', async (req, res) => {
        try {
            const userId = req.params.userId;
            const {
                totalCreditUsed,
                totalCreditLimit,
                accountAges,
                accountTypes,
                hardInquiries,
                activeAccounts,
                negativeRecords
            } = req.body;

            // Validate required fields
            if (
                !userId ||
                totalCreditUsed == null ||
                totalCreditLimit == null ||
                !Array.isArray(accountAges) ||
                !Array.isArray(accountTypes) ||
                hardInquiries == null ||
                activeAccounts == null ||
                !negativeRecords
            ) {
                return res.status(400).json({ error: "Invalid or missing input data." });
            }

            // Prepare the credit score parameters data
            const creditScoreData = {
                userId: new ObjectId(userId),
                totalCreditUsed,
                totalCreditLimit,
                accountAges,
                accountTypes,
                hardInquiries,
                activeAccounts,
                negativeRecords,
                createdAt: new Date()
            };

            // Insert the credit parameters into the creditScoreParams table
            const creditInsertResult = await db.collection('credit').insertOne(creditScoreData);

            // If insertion fails, return an error
            if (!creditInsertResult.insertedId) {
                return res.status(500).json({ error: "Failed to save credit score parameters." });
            }

            // Link the credit entry with the user in the users table
            const userUpdateResult = await db.collection('users').updateOne(
                { _id: new ObjectId(userId) },
                { $set: { creditScoreId: creditInsertResult.insertedId } }
            );

            // If no user is found to update, return an error
            if (userUpdateResult.matchedCount === 0) {
                return res.status(404).json({ error: "User not found." });
            }

            res.status(200).json({
                message: "Credit score parameters saved and linked successfully.",
                creditScoreId: creditInsertResult.insertedId
            });
        } catch (error) {
            console.error("Error saving and linking credit score parameters:", error);
            res.status(500).json({ error: "Failed to save and link credit score parameters." });
        }
    });

    router.get('/getCreditScore/:userId', async (req, res) => {
        try {
            const userId = req.params.userId;
    
            // Validate userId
            if (!ObjectId.isValid(userId)) {
                return res.status(400).json({ error: "Invalid userId format." });
            }
    
            // Fetch credit score parameters from the credit collection
            const creditScoreData = await db.collection('credit').findOne({ userId: new ObjectId(userId) });
    
            if (!creditScoreData) {
                return res.status(404).json({ error: "Credit score parameters not found for this user." });
            }
    
            res.status(200).json({
                message: "Credit score parameters retrieved successfully.",
                data: creditScoreData
            });
        } catch (error) {
            console.error("Error retrieving credit score parameters:", error);
            res.status(500).json({ error: "Failed to retrieve credit score parameters." });
        }
    });
    

    return router;
};
