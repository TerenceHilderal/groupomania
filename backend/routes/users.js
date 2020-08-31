const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users')

// const { body, validationResult } = require('express-validator');



router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/myprofile', usersCtrl.userProfile);
// router.delete('/delete', usersCtrl.deleteProfile)

// j'exporte mon router pour pouvoir l'utiliser dans mon app.js et definir les routes 
module.exports = router;