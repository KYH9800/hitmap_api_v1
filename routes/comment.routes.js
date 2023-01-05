const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('start comment router');
});

module.exports = router;
