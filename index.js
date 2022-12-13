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

app.listen(port, () => console.log(`compsigh listening on port ${port}!`));
