const express = require('express');
const axios = require('axios'); // Import the axios library
const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());

app.post('/webhook', async (req, res) => {
  // Raw notification data is available in req.body
  const notificationData = req.body;

  // Access the nested values
  const customerId = req.body.Body.Key.Details.customerid;
  const action = req.body.Body.Key.Details.action;

  // Log the values
  console.log('Received Webhook - Customer ID:', customerId);
  console.log('Received Webhook - Action:', action);

  // Forward the data to your Pipedream request bin
  try {
    const response = await axios.post('https://eomrm4f2rn42efc.m.pipedream.net', {
      notificationData: notificationData,
    });

    console.log('Forwarded data to Pipedream:', response.data);
    res.status(200).send('Notification received and forwarded successfully.');
  } catch (error) {
    console.error('Error forwarding data to Pipedream:', error.message);
    res.status(500).send('Error forwarding data to Pipedream');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});