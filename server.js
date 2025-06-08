const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/test', async (req, res) => {
  console.log('📩 Received POST data on /test:', req.body);

  try {
    const response = await axios.post(
      "https://1ec6-2401-4900-ac94-5e0d-f1f1-e8d5-1b69-e491.ngrok-free.app/stop", {
      sensor: req.body.sensor || 'fallback'
    }, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });

    console.log('✅ Sent request to /start. Response:');
    console.log(response.data);

    res.send('📤 Forwarded to ngrok successfully');
  } catch (error) {
    console.error('❌ Error sending to ngrok:', error.message);
    res.status(500).send('Something went wrong');
  }
});

app.get('/', (req, res) => {
  res.send('👋 Hello from the Express server!');
} );

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
