const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { where } = require("sequelize/types");
// const { Where } = require("sequelize/types/lib/utils");
// const utils = require("../utils/jwtUtils");
const models = require("../models");

exports.signup = async (req, res) => {
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

	// if (!password_regex.test(password)) {
	// 	res.status(400).json({
	// 		error:
	// 			" Password must be between 4 and 8 digits long and include at least one numeric digit"
	// 	});
	// }

	// On cherche l'utilisateur dans la bdd
	try {
		const oldUser = await models.User.findOne({
			attributes: ["email"],
			where: { email: email }
		});
		if (oldUser) {
			throw new Error("Already have an account");
		}
		// const newUser = JSON.parse(req.body.user);

		const newUser = await models.User.create({
			email: email,
			username: username,
			password: await bcrypt.hash(password, 10),
			role: role,
			isAdmin: 0
		});
		const token =
			"Bearer " +
			jwt.sign({ id: newUser.id }, "SECRET_KEY", { expiresIn: "24h" });
		res.status(201).json({
			user_id: newUser.id,
			email: newUser.email,
			username: newUser.username,
			isAdmin: newUser.isAdmin,
			role: newUser.role,
			token
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
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
		const token =
			"Bearer " + jwt.sign({ id: user.id }, "SECRET_KEY", { expiresIn: "24h" });
		res.status(200).json({
			user_id: user.id,
			email: user.email,
			username: user.username,
			role: user.role,
			isAdmin: user.isAdmin,
			token
		});
	} catch (error) {
		res.status(error.status).json({ error: error });
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
		res.status(200).json({ user });
	} catch (error) {
		res.status(400).json({ error });
	}
};

exports.deleteProfile = async (req, res) => {
	// params
	try {
		const userToFind = models.User.findOne({
			where: { id: req.user.id }
		});
		if (!userToFind) {
			throw new Error("Sorry,can't find your account");
		}

		const userToDestroy = await models.User.destroy({
			where: { id: req.user.id }
		});

		const posts = await models.Post.findAll({
			where: {
				userId: req.user.id
			}
		});
		posts.forEach(post => {
			const postFilename = post.imageUrl.split("/images/")[1];
			fs.unlink(`images/${postFilename}`, () => {
				post.destroy();
			});
		});
		await models.Comment.destroy({
			where: {
				userId: req.user.id
			}
		});
		if (!userToDestroy) {
			throw new Error("Sorry,something gone wrong");
		}
		res
			.status(200)
			.json({ message: "Your account has been successfully deleted" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// exports.updateProfile = async (req, res, next) => {
// 	// Modification du Profil Utilisateur
// 	try {
// 		const userToFind = models.User.findOne({
// 			// attributes: ["role", "id", "isAdmin", "username"],
// 			where: { id: req.user.id }
// 		});
// 		console.log(userToFind);

// 		if (!userToFind) {
// 			throw new Error("Sorry,we can't find your account");
// 		}

// 		const userToUpdate = await models.User.update(
// 			{
// 				username: req.body.username,
// 				role: req.body.role,
// 				isAdmin: req.body.isAdmin
// 			},
// 			{
// 				where: { id: req.user.id }
// 			}
// 		);
// 		res.status(200).json({
// 			user: userToUpdate,
// 			message: "Your account has been update"
// 		});

// 		if (!userToUpdate) {
// 			throw new Error("Sorry,we can't update your account");
// 		}
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// };
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
							.json({ error, message: "Impossible de modifier votre profil." })
					);
			} else {
				return res.status(400).json({ message: "User not found" });
			}
		})
		.catch(error =>
			res.status(500).json({ error, message: "Authorization issue" })
		);
};
