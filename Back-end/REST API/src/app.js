const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const reportsRoutes = require('./routes/reports');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/users', usersRoutes);
app.use('/reports', reportsRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});