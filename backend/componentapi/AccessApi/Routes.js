const express = require('express');
const router = express.Router();
const accessController = require('./Controller');

router.get('/get/:role', accessController.getAccessByRole);
router.post('/post', accessController.createAccessRecords);

module.exports = router;
