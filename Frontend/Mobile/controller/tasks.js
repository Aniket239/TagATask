// Import required modules
const express = require('express');
const axios = require('axios');

// Initialize the Express app
const app = express();

// Route to handle the API call
app.get('/fetch-data', async (req, res) => {
  try {
    // Make an API call using Axios
    const response = await axios.get('https://api.example.com/data'); // Replace with the API you are calling

    // Send the fetched data back as a response
    res.json(response.data);
  } catch (error) {
    // Handle error if the API call fails
    console.error('Error fetching data from API:', error);
    res.status(500).send('Error fetching data');
  }
});

// Start the Express server
const port = 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
