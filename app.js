const express = require('express');
const app = express();
const port = 3065;
// cors
const cors = require('cors');
// routes
const indexRouter = require('./routes');

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
