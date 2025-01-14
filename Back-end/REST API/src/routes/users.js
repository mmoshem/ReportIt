const express = require("express");
const router = express.Router();
const db = require("../services/firebase");

//create ne user

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

  module.exports = router;