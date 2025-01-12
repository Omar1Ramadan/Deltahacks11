const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

module.exports = (db) => {
    const chatsCollection = db.collection('chats');

    // Route to save a new chat
    router.post('/saveChat', async (req, res) => {
        try {
            const { userId, messages } = req.body;

            if (!userId || !messages) {
                return res.status(400).json({ error: 'userId and messages are required.' });
            }

            const newChat = {
                userId: new ObjectId(userId), // User ID reference
                messages: messages,       // Array of message objects
                createdAt: new Date(),    // Timestamp for the chat creation
                updatedAt: new Date()     // Timestamp for updates
            };

            const result = await chatsCollection.insertOne(newChat);
            res.status(200).json({ message: 'Chat saved successfully.', chatId: result.insertedId });
        } catch (error) {
            res.status(500).json({ error: 'Failed to save chat.', details: error.message });
        }
    });

    // Route to retrieve a user's chats
    router.get('/getChats/:userId', async (req, res) => {
        try {
            const { userId } = req.params;

            const chats = await chatsCollection.find({ userId: new ObjectId(userId) }).toArray();
            res.status(200).json(chats);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve chats.', details: error.message });
        }
    });

    // Route to retrieve a specific chat by chat ID
    router.get('/getChat/:chatId', async (req, res) => {
        try {
            const { chatId } = req.params;

            const chat = await chatsCollection.findOne({ _id: new ObjectId(chatId) });
            if (!chat) {
                return res.status(404).json({ error: 'Chat not found.' });
            }

            res.status(200).json(chat);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve chat.', details: error.message });
        }
    });

    // Route to delete a specific chat by chat ID
    router.delete('/deleteChat/:chatId', async (req, res) => {
        try {
            const { chatId } = req.params;

            const result = await chatsCollection.deleteOne({ _id: ObjectId(chatId) });
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Chat not found.' });
            }

            res.status(200).json({ message: 'Chat deleted successfully.' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete chat.', details: error.message });
        }
    });

    return router;
};
