const router = express.Router();

// Imports
const express = require('express');
const postsCtrl = require('../controllers/posts')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')




router.post('/post/new', auth, multer, postsCtrl.createPost)




module.exports = router