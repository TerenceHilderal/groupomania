// import

const models = require('../models');
const fs = require('fs')

// constants

// controllers

exports.createPost = (req, res, next) => {

  let attachmentURL;
  models.User.findOne({
    attributes: ['username', 'role', 'createdAt', 'updatedAt'],
    where: { id: req.user.id }
  })



}










// exports.getAllPosts = (req, res, next) => {

//   const fields = req.query.fields; // selectionner les colonnes que l'on souhaite afficher
//   const order = req.query.order;  // afficher les messages dans un certain ordre

//   models.Post.findAll({
//     order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']], // on test
//     attributes: (fields != '*' && fields != null) ? fields.split(',') : null, //idem ici
//     include: [{
//       model: models.User,
//       attributes: ['username']
//     }]
//   })
//     .then((post) => {
//       if (post) {
//         res.status(200).json(post)
//       } else {
//         res.status(404).json({ 'error': "posts not found" })
//       }
//     })
//     .catch(err => res.status(500).json({ err }));

// }
