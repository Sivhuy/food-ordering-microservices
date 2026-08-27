const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

// API 1: View all restaurants
app.get('/viewallrestaurant', (req, res) => {
  console.log("viewallrestaurant API called");
  res.send("viewallrestaurant API called");
});

// API 2: Search restaurant
app.get('/searchrestaurant', (req, res) => {
  console.log("searchrestaurant API called");
  res.send("searchrestaurant API called");
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Restaurant Service running on http://0.0.0.0:${PORT}`);
});

