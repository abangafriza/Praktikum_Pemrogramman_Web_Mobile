const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const multer = require('multer');

const port = 5001;

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain')
  next();
})

const upload = multer();
const formParser = upload.fields([]);
const jsonParser = bodyParser.json();
const textParser = bodyParser.text();

app.post('/', [formParser, jsonParser, textParser], (req, res) => {

  res.write(JSON.stringify(req.headers, null, 2))
  res.write('\n\n')

  const contentType = req.get('content-type');

  if (contentType.includes('text/plain')) {
    res.write(req.body)
  }

  if (contentType.includes('application/json') ||
      contentType.includes('multipart/form-data')) {
    res.write(JSON.stringify(req.body, null, 2))
  }

  res.end()

});

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

