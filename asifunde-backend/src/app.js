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
const db_change = require('./routes/db');
const loginRouter = require('./routes/login');
const dashRouter = require('./routes/dash');
const dashassessRouter = require('./routes/dashassessments');
const assessallRouter = require('./routes/assessmentsall');
const progressRouter = require('./routes/learnerprogress');
const learnerannouncementRouter = require('./routes/LearnerAnnouncements');

app.use('/api', db_change);
app.use('/api', loginRouter);
app.use('/api/dash', dashRouter);
app.use('/api/dashassessments', dashassessRouter);
app.use('/api/assessmentsall', assessallRouter);
app.use('/api/learnerprogress', progressRouter);
app.use('/api/LearnerAnnouncements', learnerannouncementRouter);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
