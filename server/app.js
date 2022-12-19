const express = require('express');
const app = express();

const configRoutes = require('./routes');

// uncomment when ready to use redis
// const redis = require('redis');
// const client = redis.createClient();
// client.connect().then(() => {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

configRoutes(app);

// static file declaration
if (process.env.NODE_ENV === 'production') {
    // prod mode
    app.use(express.static('client/build'))
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  }
  else {
    app.use(express.static('client/public'))
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'))
    })
  }

const port = process.env.PORT || 3008;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
  