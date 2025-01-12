const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

module.exports = (db) => {
  router.post('/addUser', async (req, res) => {
    try {
      const user = req.body;
      const result = await db.collection('users').insertOne(user);
      res.status(201).send(result);
    } catch (error) {
      console.error("Error adding user:", error); // Log the error for debugging
      res.status(500).send({ error: 'Failed to add user' });
    }
  });

  router.get('/getUser/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ error: 'User not found' });
      }
    } catch (error) {
      console.error("Error getting user:", error); // Log the error for debugging
      res.status(500).send({ error: 'Failed to get user' });
    }
  });

  router.delete('/deleteUser/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const result = await db.collection('users').deleteOne({ _id: new ObjectId(userId) });
      if (result.deletedCount === 1) {
        res.status(200).send({ message: 'User deleted successfully' });
      } else {
        res.status(404).send({ error: 'User not found' });
      }
    } catch (error) {
      console.error("Error deleting user:", error); // Log the error for debugging
      res.status(500).send({ error: 'Failed to delete user' });
    }
  });

  router.put('/updateUser/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const updateData = req.body;
      const result = await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $set: updateData }
      );
      if (result.matchedCount === 1) {
        res.status(200).send({ message: 'User updated successfully' });
      } else {
        res.status(404).send({ error: 'User not found' });
      }
    } catch (error) {
      console.error("Error updating user:", error); // Log the error for debugging
      res.status(500).send({ error: 'Failed to update user' });
    }
  });

  router.get('/getCreditHistory/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await db.collection('users').findOne({ _id: new ObjectId(userId) }, { projection: { credit_history: 1 } });
      if (user) {
        res.status(200).send(user.credit_history);
      } else {
        res.status(404).send({ error: 'User not found' });
      }
    } catch (error) {
      console.error("Error getting credit history:", error); // Log the error for debugging
      res.status(500).send({ error: 'Failed to get credit history' });
    }
  });

  router.get('/getAssets/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await db.collection('users').findOne({ _id: new ObjectId(userId) }, { projection: { assets: 1 } });
      if (user) {
        res.status(200).send(user.assets);
      } else {
        res.status(404).send({ error: 'User not found' });
      }
    } catch (error) {
      console.error("Error getting assets:", error); // Log the error for debugging
      res.status(500).send({ error: 'Failed to get assets' });
    }
  });

  router.post('/addCreditHistory/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const newCreditHistory = req.body;
      const result = await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $push: { credit_history: newCreditHistory } }
      );
      if (result.matchedCount === 1) {
        res.status(200).send({ message: 'Credit history added successfully' });
      } else {
        res.status(404).send({ error: 'User not found' });
      }
    } catch (error) {
      console.error("Error adding credit history:", error); // Log the error for debugging
      res.status(500).send({ error: 'Failed to add credit history' });
    }
  });

  return router;
};
