const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { format } = require('@fast-csv/format');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CSV file setup
const csvStream = format({ headers: true });
const writableStream = fs.createWriteStream('orders.csv', { flags: 'a' });
csvStream.pipe(writableStream);

// Route to receive form data
app.post('/submit-order', (req, res) => {
  const { name, order, quantity } = req.body;

  // Append to CSV
  csvStream.write({ name, order, quantity });

  res.json({ message: 'Order received and saved to CSV!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
