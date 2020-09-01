// import
const models = require('../models');
const fs = require('fs')
// const utils = require('../utils');
// constants

// routes

exports.createPost = (req, res, next) => {

  const postObject = JSON.parse(req.body.post)
  const posts = models.Post.create({
    ...postObject,
    attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    title: req.body.title,
    content: req.body.content,
    id_users: req.user.id
  })
  posts.save()
    .then(() => res.status(201).json({ 'message': 'publication crée' }))
    .catch(err => res.status(400).json({ err }))
}
