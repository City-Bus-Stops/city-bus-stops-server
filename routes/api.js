const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  return res.status(200).json({
    message: "You're authorized to see this secret message.",
  });
});


module.exports = router;