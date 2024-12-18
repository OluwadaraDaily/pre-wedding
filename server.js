const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "pages" folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'pages')));

// Route to serve specific HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/wedding-info', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'wedding-info.html'));
});

app.get('/gifting', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'gifting.html'))
})

// Catch-all route for undefined routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});