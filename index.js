require('dotenv').config();
const express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  debag = require('debug'),
  logger = require('morgan'),
  favicon = require('serve-favicon'),
  cors = require('cors'),
  mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const host = '127.0.0.1';
const port = 3000;

app.listen(port, host, () => {
  console.log(`Start server: port ${port}`);
});

mongoose
  .connect('mongodb://localhost:27017/test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error(err));

//setup routes:
const routeProduct = require('./components/routes');

app.get('/', (req, res) => {
  return res.status(200).send('ok');
});

app.use('/', routeProduct);

module.exports = app;
