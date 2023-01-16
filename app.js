require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const routes = require('./routes');
const { globalErrorHandler } = require('./utils/error');

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(routes);

app.all('*', (req, res, next) => {
  const error = new Error(`Can't fine ${req.originalUrl} on this server!`);
  error.statusCode = 404;

  next(error);
});

app.use(globalErrorHandler);

const PORT = process.env.Port || 8001;

app.listen(PORT, console.log(`Listening to request on Port:${PORT}`));

//TODO: 타임스케줄 활용 알림메시지 보내기, MessengerR 봇 연결, CORS 패키지 확인, Controller Layer 구상
