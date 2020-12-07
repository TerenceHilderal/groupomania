// import

const models = require("../models");
const fs = require("fs");
const { RSA_NO_PADDING } = require("constants");
const { post } = require("../app");

// create a post
exports.createPost = async (req, res) => {
	try {
		const attachmentURL = `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`;
		if (!attachmentURL) {
			throw new Error(" Sorry, missing parameters");
		}
		const findUser = await models.User.findOne({
			attributes: ["username", "role"],
			where: { id: req.user.id }
		});
		if (!findUser) {
			throw new Error("Sorry,we can't find your account");
		}
		const newPost = await models.Post.create({
			title: req.body.title,
			content: req.body.content,
			attachment: attachmentURL,
			UserId: req.user.id,
			isModerate: 0
		});
		if (!newPost) {
			throw new Error(" Sorry, missing parameters");
		}
		res.status(200).json({ newPost });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// get all posts
exports.getAllPosts = async (req, res) => {
	try {
		const fields = req.query.fields;
		const order = req.query.order;

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
		const order = req.query.order;
		const fields = req.query.fields;

		const postProfile = await models.Post.findAll({
			order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
			attributes: fields != "*" && fields != null ? fields.split(",") : null,
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

// moderate a post
exports.moderatePost = async (req, res) => {
	try {
		const postToModerate = await models.Post.findOne({
			where: { id: req.params.id }
		});
		if (!postToModerate) {
			throw new Error(" Couldn't find your post");
		}
		postToModerate.isModerate
			? postToModerate.update({
					isModerate: 0
			  })
			: postToModerate.update({
					isModerate: 1
			  });

		res.status(200).json({
			message: "This post is now moderate",
			postModerate: postToModerate
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a post
exports.deletePost = async (req, res) => {
	try {
		const post = await models.Post.findOne({ where: { id: req.params.id } });

		if (post.attachment !== null) {
			const filename = post.attachment.split("/images/")[1];
			fs.unlink(`images/${filename}`, err => {
				if (err) throw new Error({ err });
			});
		}
		if (!post) {
			throw new Error("Sorry,your post doesn't exist ");
		}

		await models.Post.destroy({
			where: { id: req.params.id }
		});
		res.status(200).json({ message: "Post has been deleted " });
		await models.Comment.destroy({
			where: { id: req.params.id }
		});
		res.status(200).json({ message: "Your comment has been deleted" });
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

// PROJET AMELIORATION

exports.updatePost = async (req, res) => {
	try {
		const attachmentURL = `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`;

		const postFound = await models.Post.findOne({
			where: { id: req.params.id }
		});
		if (postFound && postFound.UserId !== req.user.id) {
			res.status(400).json({ error: error.message });
		}

		await postFound.update({
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
