const express = require('express');
const router = express.Router();
const faqController = require('./Controller');

router.get('/get', faqController.getFAQs);
router.post('/post', faqController.createFAQ);
router.put('/put/:id', faqController.updateFAQ);
router.delete('/delete/:id', faqController.deleteFAQ);

module.exports = router;
