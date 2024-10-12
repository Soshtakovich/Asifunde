const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

//app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(cors({
    origin: (origin, callback) => {
      // Allow all origins or specific logic to handle dynamic origins
      callback(null, true);
    },
    credentials: true  // Enable credentials (cookies, authorization headers)
  }));

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

//Routes
const loginRouter = require('./routes/login');
const dashRouter = require('./routes/dash');
app.use('/api', loginRouter);
app.use('/api/dash', dashRouter);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
