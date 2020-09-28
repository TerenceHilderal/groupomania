const express = require("express");
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comments");
const router = express.Router();

// Routes

router.post("/:id/comment", commentCtrl.createComment);
router.get("/:id/comments", commentCtrl.getComments);
router.delete("/comment/:id", commentCtrl.deleteComment);

module.exports = router;
