const express = require('express');
const router = express.Router();
const authController = require('./Controller');

router.post('/post/create-user',authController.createUser)
router.get('/get/get-user',authController.getAllUser)
router.get('/get/get-one-user/:id',authController.getOneUser)
router.put('/put/edit-user/:id',authController.getEditUser)
router.delete('/delete/delete-user/:id',authController.getDeleteUser)


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);
router.post('/startup', authController.createDefaultAdmin);

router.post('/contact-us',authController.cantactUs)

module.exports = router;
