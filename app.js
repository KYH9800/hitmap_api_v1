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
// helmet - XSS 공격을 방지하기 위한 모듈
const helmet = require('helmet');
// hpp(HTTP Parameter Pollution) - Express의 중복 이름 파라메터 공격을 방어해주는 모듈
// hpp 모듈은 여러개의 query parameter로 전달된 값들이 모두 무시되고 단 한개의 값만 담겨지게 만든다.
// 참고: https://inpa.tistory.com/entry/NODE-%EB%B3%B4%EC%95%88-%F0%9F%93%9A-hpp-%EB%AA%A8%EB%93%88-%EC%82%AC%EC%9A%A9%EB%B2%95
const hpp = require('hpp');

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
  app.use(helmet());
  app.use(hpp());
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
