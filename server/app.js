const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});
const configRoutes = require('./routes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

configRoutes(app);

const port = 3008;
app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
});
  