const express = require('express');
const auth = require('../middleware/auth')
const commentCtrl = require('../controllers/comments')
const router = express.Router();


// Routes

router.post('/newComment', commentCtrl.createComment)


module.exports = router