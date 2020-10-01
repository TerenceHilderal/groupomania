// import

const models = require("../models");
const fs = require("fs");
const { RSA_NO_PADDING } = require("constants");
const { post } = require("../app");

// constants

// controllers

exports.createPost = async (req, res) => {
	try {
		const attachmentURL = `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`;
		const findUser = await models.User.findOne({
			attributes: ["username", "role"],
			where: { id: req.user.id }
		});
		if (!findUser) {
			throw new Error("Can't find user");
		}
		const newPost = await models.Post.create({
			title: req.body.title,
			content: req.body.content,
			attachment: attachmentURL,
			UserId: req.user.id
		});
		if (!newPost) {
			throw new Error(" Sorry, missing parameters");
		}
		res.status(200).json({ newPost });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.updatePost = async (req, res) => {
	try {
		const attachmentURL = `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`;

		const postFound = await models.Post.findOne({
			where: { id: req.params.id }
		});
		if (postFound && postFound.UserId !== req.user.id) {
			res.status(400).json({ error: "Unauthorized action" });
		}

		postFound.update({
			title: req.body.title,
			content: req.body.content,
			attachment: attachmentURL,
			userId: req.user.id
		});

		res.status(201).json({
			message: " Your post has been updated",
			PostUpdated: postFound
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getAllPosts = async (req, res, next) => {
	try {
		const fields = req.query.fields; // selectionner les colonnes que l'on souhaite afficher
		const order = req.query.order; // afficher les messages dans un certain ordre

		const posts = await models.Post.findAll({
			order: [order != null ? order.split(":") : ["createdAt", "DESC"]], // on test
			attributes: fields != "*" && fields != null ? fields.split(",") : null, //idem ici
			include: [
				{
					model: models.User,
					attributes: ["username"]
				}
			]
		});
		if (!posts) {
			throw new Error(" Sorry , nothing to fetch");
		}
		res.status(200).send(posts);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getPostProfile = async (req, res) => {
	try {
		const order = req.query.order; // afficher les messages dans un certain ordre
		const fields = req.query.fields; // selectionner les colonnes que l'on souhaite afficher

		const postProfile = await models.Post.findAll({
			order: [order != null ? order.split(":") : ["createdAt", "DESC"]], // on test
			attributes: fields != "*" && fields != null ? fields.split(",") : null, //idem ici
			include: [
				{
					model: models.User,
					attributes: ["username"],
					where: { id: req.params.id }
				}
			]
		});
		res.status(200).json(postProfile);
		if (!postProfile) {
			throw new Error(" This user has posted nothing ");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.deletePost = async (req, res) => {
	try {
		const post = await models.Post.findOne({ where: { id: req.params.id } });

		if (post.attachment !== null) {
			const filename = post.attachment.split("/images/")[1];
			fs.unlink(`images/${filename}`, err => {
				// if (err) throw new Error({ err });
			});
		}
		// if (!req.user.isAdmin || (post && post.UserId !== req.user.id)) {
		// 	throw new Error("Unauthorized action");
		// }
		if (!post) {
			throw new Error("Sorry,your post doesn't exist ");
		}

		// if (req.user.isAdmin === true || post.UserId === req.user.id) {
		const delPost = await models.Post.destroy({
			where: { id: req.params.id }
		});
		res.status(200).json({ message: "Post has been deleted " });
		// }
		if (!delPost) {
			throw new Error("Sorry we couldn't delete your post");
		}

		await models.Comment.destroy({
			where: { id: req.params.id }
		});

		res.status(200).json({ message: "Your comment has been deleted" });
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};
