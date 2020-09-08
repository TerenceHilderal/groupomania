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
		if (postFound) {
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
			throw new Error({ error: " Sorry , we Couldn't update your post" });
		}
	} catch (error) {
		console.log(error);
	}
};

exports.getAllPosts = async (req, res, next) => {
	// const fields = req.query.fields; // selectionner les colonnes que l'on souhaite afficher
	// const order = req.query.order; // afficher les messages dans un certain ordre

	// models.Post.findAll({
	// 	order: [order != null ? order.split(":") : ["createdAt", "DESC"]], // on test
	// 	attributes: fields != "*" && fields != null ? fields.split(",") : null, //idem ici
	// 	include: [
	// 		{
	// 			model: models.User,
	// 			attributes: ["username"]
	// 		}
	// 	]
	// })
	// 	.then(post => {
	// 		if (post) {
	// 			res.status(200).json(post);
	// 		} else {
	// 			res.status(404).json({ error: "posts not found" });
	// 		}
	// 	})
	// 	.catch(err => res.status(500).json({ err }));
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

exports.deletePost = async (req, res) => {
	// models.Post.findOne({
	// 	where: { id: req.params.id }
	// })
	// 	.then(postFound => {
	// 		if (postFound.UserId == req.user.id || req.user.isAdmin == true) {
	// 			models.Post.destroy({ where: { id: req.params.id } });
	// 			res.status(200).json({ message: "post has been deleted", postFound });
	// 		}
	// 	})
	// 	.catch(err =>
	// 		res.status(401).json({ error: "error while triying to delete the post" })
	// 	);
	// console.log(postFound.UserId);
	// console.log(req.user.id);
	try {
		const post = await models.Post.findOne({ where: { id: req.params.id } });
		if (post.attachment != null) {
			const filename = post.attachment.split("/images/")[1];
			fs.unlink(`images/${filename}`, err => {
				// if (err) throw err;
			});
		}
		if (req.user.isAdmin == true || (post && post.UserId == req.user.id)) {
			await models.Post.destroy({ where: { id: req.params.id } });
			res.status(200).json({ message: "Post has been deleted ", post });
		} else {
			res.status(401).json({ error: "Unauthorized action!" });
		}
	} catch {
		err;
	}
};
