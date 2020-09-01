const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../utils/jwtUtils')
const models = require('../models');




exports.signup = (req, res, next) => {
  // params
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  // regex
  const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const password_regex = /^(?=.*\d).{4,8}$/

  // verifications
  if (email == null || username == null || password == null) {
    res.status(400).json({ 'error': 'Missing parameters' })
  };

  if (username.length >= 13 || username.length <= 4) {
    res.status(400).json({ 'error': 'Username lenght must be 4-13' })
  }

  if (!email_regex.test(email)) {
    res.status(400).json({ 'error': "Your email is not valid" })
  }

  if (!password_regex.test(password)) {
    res.status(400).json({ 'error': " Password must be between 4 and 8 digits long and include at least one numeric digit" })
  }


  // On cherche l'utilisateur dans la bdd
  models.User.findOne({
    attributes: ['email'],
    where: { email: email }
  })
    .then(userFound => {
      if (!userFound) {
        bcrypt.hash(password, 10, (err, bcryptedPassword) => {
          const newUser = models.User.create({
            email: email,
            username: username,
            password: bcryptedPassword,
            role: role,
            isAdmin: 0
          })
        })
          .then(newUser => {
            res.status(201).json({ 'newUser_id': newUser.id + "new user has been created" })
          })
          .catch(err => res.status(500).json({ err }));

      } else {
        res.status(409).json({ 'error': 'user already exist' });
      }
    });
}


exports.login = async (req, res, next) => {

  try {
    const user = await models.User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!user) {
      return res.status(404).send({ error: "Utilisateur introuvable" })
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
      return res.status(401).send({ error: "Mot de passe incorrecte" })
    }
    const token = jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '24h' })
    res.status(200).send({ user_id: user.id, token })
  } catch (err) {
    res.status(500).send(err)
  }



  // params
  // const email = req.body.email;
  // const password = req.body.password;

  // if (email === null || password === null) {
  //   return res.status(400).json({ 'error': "user didn't exist" })
  // }
  // // things to check
  // models.User.findOne({
  //   where: { email: email }
  // })
  //   .then(user => {
  //     if (user) {
  //       bcrypt.compare(password, user.password, (err, resByBcrypt) => {
  //         if (resByBcrypt) {
  //           res.status(200).json({
  //             'user_id': user.id,
  //             'token': utils.generateToken(user),
  //           })
  //         } else {
  //           res.status(403).json({ 'error': 'invalid password' })
  //         }
  //       })
  //     } else {
  //       res.status(404).json({ 'error': 'user didnt exist in DB' })
  //     }
  //   })
}

exports.userProfile = async (req, res) => {
  // const user_id = utils.getUserId(req.headers.authorization)

  // await models.User.findOne({
  //   attributes: ['id', 'email', 'username', "role", "isAdmin"],
  //   where: { id: user_id }
  // })
  //   .then(user => res.status(200).json(user))
  //   .catch(error => res.status(500).json({ "error": "can't find user" }))
  try {
    const user = await models.User.findOne({
      attributes: ['id', 'email', 'username', "role", "isAdmin"],
      where: {
        id: req.user.id
      }
    })
    res.status(200).send(user)
  } catch (err) {
    res.status(500).send(err)
  }
};

// exports.deleteProfile = (req, res, next) => {
//   // params

//   User.destroy({
//     where: { id: user.id }
//   })


// }


