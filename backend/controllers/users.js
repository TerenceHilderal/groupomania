const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const models = require("../models");

exports.signup = async (req, res) => {
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const role = req.body.role;

	const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const password_regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
	const username_regex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

	// On cherche l'utilisateur dans la bdd

	try {
		if (!email || !username || !password || !role) {
			throw new Error("Missing parameters");
		}

		if (!email_regex.test(email)) {
			throw new Error("Wrong email format");
		}

		if (!password_regex.test(password)) {
			throw new Error(
				"-At least 8 characters long - Include at least 1 lowercase letter - 1 capital letter - 1 number - 1 special character = !@#$%^&*"
			);
		}
		// if (username_regex.test(username)) {
		// 	throw new Error("max 20 characters");
		// }
		// if (username_regex.test(role)) {
		// 	throw new Error("max 20 characters");
		// }

		const oldUser = await models.User.findOne({
			attributes: ["email"],
			where: { email: email }
		});
		if (oldUser) {
			throw new Error("Already have an account");
		}

		const newUser = await models.User.create({
			email: email,
			username: username,
			password: await bcrypt.hash(password, 10),
			role: role,
			isAdmin: 0,
			latent: 1
		});
		const token =
			"Bearer " +
			jwt.sign({ id: newUser.id }, "SECRET_KEY", { expiresIn: "2H" });
		res.status(201).json({
			user_id: newUser.id,
			email: newUser.email,
			username: newUser.username,
			isAdmin: newUser.isAdmin,
			role: newUser.role,
			latent: newUser.latent,
			token
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.login = async (req, res) => {
	try {
		const user = await models.User.findOne({
			where: {
				email: req.body.email,
				latent: 1
			}
		});

		if (!user) {
			throw new Error("Sorry,can't find your account");
		}

		const isMatch = await bcrypt.compare(req.body.password, user.password);
		if (!isMatch) {
			throw new Error("Incorrect password");
		}
		const token =
			"Bearer " + jwt.sign({ id: user.id }, "SECRET_KEY", { expiresIn: "2h" });
		res.status(200).json({
			user: user,
			token
		});
		if (!token) {
			throw new Error("Something gone wrong try again later");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.userProfile = async (req, res) => {
	try {
		const user = await models.User.findOne({
			attributes: ["id", "email", "username", "role", "isAdmin", "latent"],
			where: {
				id: req.user.id
			}
		});
		if (!user) {
			throw new Error("Sorry,can't find your account");
		}
		res.status(200).json({ user });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.deleteProfile = async (req, res) => {
	try {
		const userToFind = await models.User.findOne({
			where: { id: req.user.id }
		});
		if (!userToFind) {
			throw new Error("Sorry,can't find your account");
		}
		const notLatent = userToFind.update({
			latent: 0
		});

		res.status(200).json({
			message: "Your account has been successfully deleted"
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.updateProfile = async (req, res, next) => {
	try {
		const userToFind = await models.User.findOne({
			attributes: ["role", "id", "isAdmin", "username"],
			where: { id: req.user.id }
		});

		if (!userToFind) {
			throw new Error("Sorry,we can't find your account");
		}

		const userToUpdate = await models.User.update(
			{
				username: req.body.username,
				role: req.body.role,
				isAdmin: req.body.isAdmin
			},
			{
				where: { id: req.user.id }
			}
		);
		res.status(200).json({
			user: userToUpdate.isAdmin,
			message: "Your account has been update"
		});

		if (!userToUpdate) {
			throw new Error("Sorry,we can't update your account");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
