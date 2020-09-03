
// Imports
const express = require('express');
const postsCtrl = require('../controllers/posts')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const router = express.Router();


// Routes
router.post('/new', auth, multer, postsCtrl.createPost)




module.exports = router