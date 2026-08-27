const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3004;

// API: Send notification
app.post('/sendnotification', (req, res) => {
  console.log("sendnotification API called");

  const { status } = req.body;
  res.send(`sendnotification API called - Order status: ${status}`);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Notification Service running on http://0.0.0.0:${PORT}`);
});


