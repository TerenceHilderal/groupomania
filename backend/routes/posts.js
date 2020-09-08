// Imports
const express = require("express");
const postsCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const router = express.Router();

// Routes
router.post("/new", auth, multer, postsCtrl.createPost);
router.get("/getPosts", auth, multer, postsCtrl.getAllPosts);
router.put("/:id/updatePosts", auth, multer, postsCtrl.updatePost);
router.delete("/:id/deletePosts", auth, multer, postsCtrl.deletePost);

module.exports = router;
