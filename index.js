import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

app.get('/fair', (req, res) => {
  res.sendFile(__dirname + '/fair.html');
});

app.get('/event', (req, res) => {
  res.sendFile(__dirname + '/event.html');
});

app.get('/leadership', (req, res) => {
  res.sendFile(__dirname + '/leadership.html');
});

// Make the assets folder publicly accessible
app.use('/assets', express.static(__dirname + '/assets'));

app.listen(port, () => console.log(`compsigh listening on port ${port}!`));
