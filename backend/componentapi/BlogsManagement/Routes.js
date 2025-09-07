const express = require('express');
const router = express.Router();
const blogController = require('./Controller');

router.get('/get', blogController.getBlogs);
router.get('/get/:idOrSlug', blogController.getBlogByIdOrSlug);
router.post('/post', blogController.createBlog);
router.put('/put/:id', blogController.updateBlog);
router.delete('/delete/:id', blogController.deleteBlog);

module.exports = router;
