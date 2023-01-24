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
// cookie-parser
const cookieParser = require('cookie-parser');
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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// 배포용
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  // CORS
  app.use(
    cors({
      origin: ['https://hitmap-fe.vercel.app', 'http://localhost:3000'],
      credentials: true,
    }),
  );
} else {
  // 개발용
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
}

app.use('/', indexRouter);
app.use('/userImage', express.static('public'));

app.listen(port, () => {
  console.log(port, 'port start');
});
