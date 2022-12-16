const express = require('express');
const app = express();

const configRoutes = require('./server/routes');

// uncomment when ready to use redis
// const redis = require('redis');
// const client = redis.createClient();
// client.connect().then(() => {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

configRoutes(app);

const port = 3008;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
  