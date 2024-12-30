require("dotenv").config()

//TODO: fix? npm vulnerabilties

const connectDB = require('./db/mongodb')

connectDB()

const express = require('express');

const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")

const cors = require('cors')

const app = express();

const apiRouter = require('./routes/Api')
const userRouter = require('./routes/Users');
const weekScoreRouter = require('./routes/WeekScores')

app.use(mongoSanitize())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: [],
          connectSrc: ["'self'"],
          scriptSrc: ["'unsafe-inline'", "'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          workerSrc: ["'self'", "blob:"],
          objectSrc: [],
          imgSrc: [],
          fontSrc: ["'self'"],
      },
  })
);

app.use('/api/', apiRouter)
app.use('/user/', userRouter)
app.use('/weekscore/', weekScoreRouter)

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  console.log("AppError:", err);
  res.status(status).json({ message })
});

app.listen(process.env.PORT, () => {
  console.log(`Hello, server running: ${process.env.PORT}`);
});

module.exports = app;
