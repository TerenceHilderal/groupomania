// import

const models = require('../models');
const fs = require('fs')

// constants

// controllers

exports.createPost = (req, res) => {

  // const attachmentURL;

  models.User.findOne({
    attributes: ['username', 'role',],
    where: { id: req.user.id }
  })

  models.Post.create({
    title: req.body.title,
    content: req.body.content,
    attachment: req.body.attachment,
    UserId: req.user.id,
  })
    .then((newPost) => res.status(201).json({ newPost }))
    .catch(err => res.status(400).json({ err }))

}










exports.getAllPosts = (req, res, next) => {

  const fields = req.query.fields; // selectionner les colonnes que l'on souhaite afficher
  const order = req.query.order;  // afficher les messages dans un certain ordre

  models.Post.findAll({
    order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']], // on test
    attributes: (fields != '*' && fields != null) ? fields.split(',') : null, //idem ici
    include: [{
      model: models.User,
      attributes: ['username']
    }]
  })
    .then((post) => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ 'error': "posts not found" })
      }
    })
    .catch(err => res.status(500).json({ err }));

}


exports.deletePosts = (req, res) => {

  models.User.findOne({
    attributes: ['id', 'username', 'role'],
    where: { id: req.user.id }
  })
}
