// import

const models = require('../models');
const fs = require('fs')
// const utils = require('../utils');
// constants

// routes

exports.createPost = async (req, res, next) => {

  try {
    const postObject = req.file ? {
      ...JSON.parse(req.body.post),
      attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...JSON.parse(req.body.post) }
    await models.Post.create({
      ...postObject,
      title: req.user.title,
      content: req.user.content,
      id_users: req.user.id
    })
    res.status(201).send({ message: "Publication créée" })
  } catch (err) {
    res.status(500).send(err)
  }
}
