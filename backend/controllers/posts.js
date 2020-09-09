// import

const models = require("../models");
const fs = require("fs");
const { RSA_NO_PADDING } = require("constants");
const { post } = require("../app");

// constants

// controllers

exports.createPost = (req, res) => {
	const attachmentURL = `${req.protocol}://${req.get("host")}/images/${
		req.file.filename
	}`;

	models.User.findOne({
		attributes: ["username", "role"],
		where: { id: req.user.id }
	});

	models.Post.create({
		title: req.body.title,
		content: req.body.content,
		attachment: attachmentURL,
		UserId: req.user.id
	})
		.then(newPost => res.status(201).json({ newPost }))
		.catch(err => res.status(400).json({ err }));
};

exports.updatePost = async (req, res) => {
	try {
		const attachmentURL = `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`;
		postFound = await models.Post.findOne({
			where: { id: req.params.id }
		});
		if (postFound && postFound && postFound.UserId == req.user.id) {
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
		} else {
			// throw new Error({ error: " Sorry , we Couldn't update your post" });
			res.status(400).json({ error: "unauthorized acation" });
		}
	} catch (error) {
		throw new Error({ error: "something gone wrong" });
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
		res.status(200).send(posts);
	} catch {
		throw new Error({ error: "posts not found" });
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
		res.status(200).send(postProfile);
	} catch (error) {
		console.log("c mort mec");
	}
};

exports.deletePost = async (req, res) => {
	try {
		const post = await models.Post.findOne({ where: { id: req.params.id } });
		if (post.attachment != null) {
			const filename = post.attachment.split("/images/")[1];
			fs.unlink(`images/${filename}`, err => {
				if (err) throw new Error({ err });
			});
		}
		if (req.user.isAdmin == true || (post && post.UserId == req.user.id)) {
			await models.Post.destroy({ where: { id: req.params.id } });
			res.status(200).json({ message: "Post has been deleted ", post });
			await models.Comment.destroy({ where: { id: req.params.id } });
		} else {
			res.status(401).json({ error: "Unauthorized action!" });
		}
	} catch (error) {
		res.status(400).send(error);
	}
};
