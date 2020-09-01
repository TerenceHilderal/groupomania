const jwt = require('jsonwebtoken');
const models = require('../models')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'SECRET_KEY');
    const user = await models.User.findOne({ where: { id: decodedToken.id } })
    if (!user) {
      throw new Error;
    }
    req.user = user
    next()
  } catch (err) {
    res.status(401).send({ error: 'veuillez vous authentifier' })
  }
}


// user_id: decodedToken.user_id 