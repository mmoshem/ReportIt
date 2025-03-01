const express = require("express");
const router = express.Router();
const db = require("../services/firebase");

//create new user

router.post('/', async (req, res) => {
    try {
      const { email, firstName, lastName, password, role } = req.body;
      const userDoc = db.collection('users').doc(email);
      await userDoc.set({ firstName, lastName, password, role });
      res.status(201).send('User created successfully.');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

// Get a user by email
router.get('/:email', async (req, res) => {
    try {
      const userDoc = await db.collection('users').doc(req.params.email).get();
      if (!userDoc.exists) return res.status(404).send('User not found.');
      res.status(200).send(userDoc.data());
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

// Get all users
router.get('/', async (req, res) => {
    try {
        const usersSnapshot = await db.collection('users').get();
        if (usersSnapshot.empty) return res.status(404).send('No users found.');

        const users = [];
        usersSnapshot.forEach(doc => {
            users.push({ email: doc.id, ...doc.data() });
        });

        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a user by email
router.delete('/:email', async (req, res) => {
    try {
        const userDoc = db.collection('users').doc(req.params.email);
        const doc = await userDoc.get();

        if (!doc.exists) {
            return res.status(404).send('User not found.');
        }

        await userDoc.delete();
        res.status(200).send('User deleted successfully.');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

  module.exports = router;