// Imports
const express = require("express");
const postsCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const router = express.Router();

// Routes
router.post("/new", auth, multer, postsCtrl.createPost);
router.get("/getPosts", multer, postsCtrl.getAllPosts);
router.get("/user/:id", multer, postsCtrl.getPostProfile);
router.put("/:id", multer, postsCtrl.updatePost);
router.delete("/:id", multer, postsCtrl.deletePost);

module.exports = router;
// oublie pas de remettre lauthentification
