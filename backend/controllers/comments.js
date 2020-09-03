// import

const models = require('../models');
const fs = require('fs')

exports.createComment = (req, res) => {

  models.Comment.create({
    comment: req.body.comments,
    // UserId: req.user.id,
    id_posts: req.params.id
  })
    .then((comment) => res.status(200).json({ message: ' Your comment has been sent!', comment }))
    .catch(err => res.status(500).json({ err }))

};



exports.deleteComment = (req, res) => {

}