const express = require("express");
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comments");
const router = express.Router();

// Routes

router.post("/:id/newComment", auth, commentCtrl.createComment);
router.get("/getComments", auth, commentCtrl.getComment);
router.delete("/:id/delete", auth, commentCtrl.deleteComment);

module.exports = router;
