const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3003;

// API: Process payment
app.post('/paymentprocess', (req, res) => {
  console.log("paymentprocess API called");

  // Simple Success/Failure simulation (kept minimal, needed for the Order flow)
  const status = Math.random() > 0.5 ? "Success" : "Failure";
  res.json({ status: status });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Payment Service running on http://0.0.0.0:${PORT}`);
});

