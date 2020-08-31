// import
const models = require('../models');
const utils = require('../utils');
// constants

// routes

exports.createPost = (req, res, next) => {
  const user_id = utils.getUserId(req.headers.authorization)

  // // params
  const title = req.body.title;
  const content = req.body.content;

  // if (title == null || content == null) {
  //   res.status(400).json({ 'error': 'You cannot send an empty post' })
  // }
  // if (title.lenght <= 2 || content.lenght <= 4) {
  //   res.status(400).json({ 'error': 'you cannot add a short' })
  // }

  models.User.findOne({
    where: { id: user_id }
  })
  // models.Posts.create({ title: req.body.title, id_users: user_id, content: req.body.content, })
  //   .then((post) => res.status(201).json({ message: `You're post has been created !`, post }))
  //   .catch((err) => res.status(500).json(err))

}
