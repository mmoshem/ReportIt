const express = require('express');
const router = express.Router();
const db = require('../services/firebase');

// Create a new report
router.post('/', async (req, res) => {
  try {
    const { category, description, location, photoUrl, status, submissionDate, userEmail } = req.body;
    const reportDoc = db.collection('reports').doc(); // Generate a new document ID
    await reportDoc.set({ category, description, location, photoUrl, status, submissionDate, userEmail });
    res.status(201).send({ id: reportDoc.id, message: 'Report created successfully.' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get a report by ID
router.get('/:id', async (req, res) => {
  try {
    const reportDoc = await db.collection('reports').doc(req.params.id).get();
    if (!reportDoc.exists) return res.status(404).send('Report not found.');
    res.status(200).send(reportDoc.data());
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update a report
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const reportDoc = db.collection('reports').doc(req.params.id);
    await reportDoc.update(updates);
    res.status(200).send('Report updated successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a report
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('reports').doc(req.params.id).delete();
    res.status(200).send('Report deleted successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;