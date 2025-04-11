const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api'); // Combined route file
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 5000;

// CORS middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
