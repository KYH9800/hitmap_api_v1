require('dotenv').config();
const express = require('express');
const app = express();
const port = 3065;
// morgan
const morgan = require('morgan');
// cors
const cors = require('cors');
// DB
const db = require('./models');
// routes
const indexRouter = require('./routes');

// db 연결 확인
db.sequelize
  .sync()
  .then(() => {
    console.log('database 연결 성공');
  })
  .catch(console.error);

// 테이블 수정 적용 여부
db.sequelize.sync({
  force: false,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('combined'));

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(port, 'port start');
});
