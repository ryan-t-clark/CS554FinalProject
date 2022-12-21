const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});
const configRoutes = require('./routes');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');
const { close, open, utimes } = fs
const im = require('imagemagick');
const { default: axios } = require('axios');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(cookieParser());
app.use(fileUpload());

// serve static images for retrieving the profile pictures
app.use('/api/images', express.static(__dirname + '/images'));

// upload api route for profile pictures
app.post('/api/upload', (req, res, next) => {
  let uploadFile = req.files.profile_pic;
  let userId = uploadFile.name;

  // write file to static images folder
  fs.writeFileSync(`${__dirname}/images/${userId}_profile_pic.jpg`, uploadFile.data, err => {
    if (err) {
      console.log(err);
    }
  });

  const imgPath = `${__dirname}/images/${userId}_profile_pic.jpg`

  // resize file for proper profile picture formatting
  im.resize({
    srcPath: imgPath,
    dstPath: imgPath,
    width: 400,
    height: 400,
    quality: 1
  }, function (err, stdout, stderr) {
    if (err) console.log(err);
    console.log(stdout)
  });

  const touch = (path, callback) => {
    const time = new Date();
    utimes(path, time, time, err => {
      if (err) {
        return open(path, 'w', (err, fd) => {
          err ? callback(err) : close(fd, callback);
        });
      }
      callback();
    });
  };
  
  // usage
  // const path = 'file.txt';
  touch(imgPath, err => {
    if (err) throw err;
    console.log(`touch ${imgPath}`);
  });

  // console.log(im.identify(imgPath, function (err, stdout, stderr) {
  //   if (err) console.log(err);
  //   // console.log(stdout)
  // }))

  

  // console.log(`localhost:3008/api/images${imgPath}`)
  // console.log(__dirname)
  return res.json({ file_uploaded: true , imgPath });
});


configRoutes(app);



const port = 3008;
app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
});
  