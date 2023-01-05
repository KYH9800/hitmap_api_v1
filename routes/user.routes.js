const express = require('express');
const router = express.Router();

// 로그인, POST /user/login
router.post('/login', (req, res) => {
  res.send('start user router');
});

// 회원가입

module.exports = router;
