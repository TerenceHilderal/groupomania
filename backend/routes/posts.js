// Imports
const express = require("express");
const postsCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const router = express.Router();

// Routes
router.post("/new", auth, multer, postsCtrl.createPost);
router.get("/getPosts", auth, multer, postsCtrl.getAllPosts);
router.get("/user/:id", auth, multer, postsCtrl.getPostProfile);
router.delete("/:id", auth, multer, postsCtrl.deletePost);
router.put("/:id/moderate", auth, postsCtrl.moderatePost);

module.exports = router;

//projet d'amélioration
router.put("/:id", auth, multer, postsCtrl.updatePost);
