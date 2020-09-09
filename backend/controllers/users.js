const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const utils = require("../utils/jwtUtils");
const models = require("../models");

exports.signup = (req, res, next) => {
	// params
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const role = req.body.role;

	// regex
	const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const password_regex = /^(?=.*\d).{4,8}$/;

	// verifications
	if (email == null || username == null || password == null) {
		res.status(400).json({ error: "Missing parameters" });
	}

	if (username.length >= 13 || username.length <= 4) {
		res.status(400).json({ error: "Username lenght must be 4-13" });
	}

	if (!email_regex.test(email)) {
		res.status(400).json({ error: "Your email is not valid" });
	}

	if (!password_regex.test(password)) {
		res.status(400).json({
			error:
				" Password must be between 4 and 8 digits long and include at least one numeric digit"
		});
	}

	// On cherche l'utilisateur dans la bdd
	models.User.findOne({
		attributes: ["email"],
		where: { email: email }
	}).then(userFound => {
		if (!userFound) {
			bcrypt
				.hash(password, 10, (err, bcryptedPassword) => {
					const newUser = models.User.create({
						email: email,
						username: username,
						password: bcryptedPassword,
						role: role,
						isAdmin: 0
					});
				})
				.then(newUser => {
					res
						.status(201)
						.json({ newUserId: newUser.id + "new user has been created" });
				})
				.catch(err => res.status(500).json({ err }));
		} else {
			res.status(409).json({ error: "user already exist" });
		}
	});
};

exports.login = async (req, res, next) => {
	try {
		const user = await models.User.findOne({
			where: {
				email: req.body.email
			}
		});
		if (!user) {
			return res.status(404).send({ error: "Utilisateur introuvable" });
		}
		const isMatch = await bcrypt.compare(req.body.password, user.password);
		if (!isMatch) {
			return res.status(401).send({ error: "Mot de passe incorrecte" });
		}
		const token = jwt.sign({ id: user.id }, "SECRET_KEY", { expiresIn: "24h" });
		res.status(200).send({
			user_id: user.id,
			email: user.email,
			username: user.username,
			role: user.role,
			isAdmin: user.isAdmin,
			token
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

exports.userProfile = async (req, res) => {
	try {
		const user = await models.User.findOne({
			attributes: ["id", "email", "username", "role", "isAdmin"],
			where: {
				id: req.user.id
			}
		});
		res.status(200).send(user);
	} catch (err) {
		res.status(500).send(err);
	}
};

exports.deleteProfile = (req, res) => {
	// params
	models.User.findOne({
		where: { id: req.user.id }
	})
		.then(userFoundForDelete => {
			if (userFoundForDelete) {
				userFoundForDelete
					.destroy({
						email: userFoundForDelete.email
					})
					.then(() =>
						res.status(200).json({ message: "Utilisateur supprimé !" })
					)
					.catch(error =>
						res
							.status(500)
							.json({ error, message: "L'utilisateur n'a pas été supprimé." })
					);
			} else {
				return res.status(400).json({
					message: "L'utilisateur n'a pas été trouvé, il ne peut être supprimé."
				});
			}
		})
		.catch(error =>
			res
				.status(500)
				.json({ error, message: "Impossible de supprimer le compte." })
		);
};

exports.updateProfile = (req, res, next) => {
	// Modification du Profil Utilisateur
	models.User.findOne({
		attributes: ["role", "id", "isAdmin", "username"],
		where: { id: req.user.id }
	})
		.then(userFound => {
			if (userFound) {
				userFound
					.update({
						username: req.body.username,
						role: req.body.role,
						isAdmin: req.body.isAdmin
					})
					.then(userFound => {
						return res
							.status(200)
							.json({ User: userFound, message: "Profil modifié !" });
					})
					.catch(error =>
						res
							.status(500)
							.json({ error, message: "Impossible de modifié votre profil." })
					);
			} else {
				return res.status(400).json({ message: "User not found" });
			}
		})
		.catch(error =>
			res.status(500).json({ error, message: "Authorization issue" })
		);
};
