const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");
const auth = require("../middleware/auth");

// const { body, validationResult } = require('express-validator');

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.delete("/delete", auth, usersCtrl.deleteProfile);

// j'exporte mon router pour pouvoir l'utiliser dans mon app.js et definir les routes
module.exports = router;

// projet d'amélioration
router.put("/update", auth, usersCtrl.updateProfile);
router.get("/myprofile", auth, usersCtrl.userProfile);
