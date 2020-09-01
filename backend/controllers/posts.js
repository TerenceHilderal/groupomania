// import
const models = require('../models');
// const utils = require('../utils');
// constants

// routes

exports.createPost = (req, res, next) => {

  const postObject = JSON.parse(req.body.post)
  const post = models.Post.create({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    title: req.body.title,
    content: req.body.content,
    users_id: req.user.id
  })
    .then(res.status(201).json({ 'message': 'publication crée' }))
    .catch(err => res.status(400).json({ err }))
}
