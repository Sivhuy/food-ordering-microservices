const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || "http://localhost:3003/paymentprocess";
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || "http://localhost:3004/sendnotification";

// API 1: Add order
// Flow: Order API -> Payment API -> Order API -> Notification API -> User
app.post('/addorder', async (req, res) => {
  console.log("addorder API called");

  try {
    // Step 1: Call Payment Process API
    console.log("Order API calling Payment API...");
    const paymentResponse = await axios.post(PAYMENT_SERVICE_URL, req.body);
    const paymentStatus = paymentResponse.data.status; // "Success" or "Failure"
    console.log(`Payment API responded with: ${paymentStatus}`);

    // Step 2: Call Notification Service API with the payment result
    console.log("Order API calling Notification API...");
    const notificationResponse = await axios.post(NOTIFICATION_SERVICE_URL, { status: paymentStatus });
    console.log("Notification API responded:", notificationResponse.data);

    // Step 3: Return full result to the User
    res.json({
      message: "addorder API called",
      order: req.body,
      paymentResult: paymentResponse.data,
      notificationResult: notificationResponse.data
    });

  } catch (error) {
    console.error("Error during order processing:", error.message);
    res.status(500).send("Error processing order");
  }
});

// API 2: View order
app.get('/vieworder', (req, res) => {
  console.log("vieworder API called");
  res.send("vieworder API called");
});

// API 3: Cancel order
app.post('/cancelorder', (req, res) => {
  console.log("cancelorder API called");
  res.send("cancelorder API called");
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Order Service running on http://0.0.0.0:${PORT}`);
});