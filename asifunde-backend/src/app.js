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

// Learner Routes
const db_change = require('./routes/db');
const loginRouter = require('./routes/login');
const dashRouter = require('./routes/dash');
const subjectListRouter = require('./routes/subjectList');
const subjectDataRouter = require('./routes/subjectinfo');
const dashassessRouter = require('./routes/dashassessments');
const assessallRouter = require('./routes/assessmentsall');
const progressRouter = require('./routes/learnerprogress');
const learnerannouncementRouter = require('./routes/LearnerAnnouncements');

app.use('/api', db_change);
app.use('/api', loginRouter);
app.use('/api/dash', dashRouter);
app.use('/api/subjectList', subjectListRouter);
app.use('/api/subjectinfo', subjectDataRouter);
app.use('/api/dashassessments', dashassessRouter);
app.use('/api/assessmentsall', assessallRouter);
app.use('/api/learnerprogress', progressRouter);
app.use('/api/LearnerAnnouncements', learnerannouncementRouter);
// Learner Routes

// Teacher Routes
const classlistRouter = require('./routes/Teacher/classlist');
const assessmentsRouter = require('./routes/Teacher/assessments');
const announcementsRouter = require('./routes/Teacher/announcements');
const addAssessRouter = require('./routes/Teacher/addassessments');
const contentRouter = require('./routes/Teacher/content');
const subtopicRouter = require('./routes/Teacher/addSubtopic');
const addContentRouter = require('./routes/Teacher/addContent');



app.use('/api/classlist', classlistRouter);
app.use('/api/assessments', assessmentsRouter);
app.use('/api/announcements', announcementsRouter);
app.use('/api/addassessments', addAssessRouter);
app.use('/api/content', contentRouter);
app.use('/api/addSubtopic', subtopicRouter);
app.use('/api/addContent',addContentRouter);
// Teacher Routes

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
