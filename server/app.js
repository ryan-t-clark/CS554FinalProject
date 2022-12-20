const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});
const configRoutes = require('./routes');
const path = require('path')
// const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const cors = require('cors');
app.use(cors());
// app.use(logger('dev'))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cookieParser())
app.use(fileUpload())

app.use('/public', express.static(__dirname + '/public'))

app.post('api/upload', (req, res, next) => {
  let uploadFile = req.files.file
  const fileName = req.files.file.name
  uploadFile.mv(
    `${__dirname}/public/files/${fileName}`,
    function (err) {
      if (err) {
        return res.status(500).send(err)
      }

      res.json({
        file: `public/${req.files.file.name}`,
      })
    },
  )
})


configRoutes(app);



const port = 3008;
app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
});
  