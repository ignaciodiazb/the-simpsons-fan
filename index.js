const express = require('express');
const cors = require('cors');
const { connectToDb } = require('./db');
const app = express();

const trivia = require('./routes/trivia.route');

app.use(cors());
app.use(express.json());
app.use('/api/trivia', trivia);

app.get('/', (req, res) => {
  res.send('The Simpsons Fan API');
});

const port = process.env.PORT || 8080;

connectToDb((err) => {
  if (err) {
    throw err;
  }
  app.listen(port, () => {
    console.log(`app listening on http://localhost:${port}`);
  });
});
