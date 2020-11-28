const jwt = require('jsonwebtoken');

const jwt_sign_secret = 'montokensupersecret'

exports.generateToken = (user) => {
  return jwt.sign({
    user_id: user.id,
    isAdmin: user.isAdmin,
  },
    jwt_sign_secret, {
    expiresIn: "48h"
  })
}

// exports.getBearer = (authorization) => { return (authorization != null) ? authorization.replace('Bearer', ' ') : null }

exports.getUserId = (data) => {
  if (data.length > 1) {
    let token = data.split(' ')[1];
    try {
      let decodedToken = jwt.verify(token, jwt_sign_secret)
      user_id = decodedToken.user_id
      return user_id
    }
    catch (err) {
      return err
    }
  };
}
