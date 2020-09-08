// import

const models = require("../models");
const fs = require("fs");

exports.createComment = async (req, res) => {
	try {
		const newCom = await models.Comment.create({
			comments: req.body.comments,
			UserId: req.user.id,
			PostId: req.params.id
		});
		if (newCom) {
			res.status(201).json({ message: "Your comment has been sent", newCom });
		} else {
			throw new Error({ error: "Sorry , something gone wrong" });
		}
	} catch (err) {
		res.status(400).json({ error: "Sorry we couldn't create your comment" });
	}
};

exports.getComment = async (req, res) => {
	try {
		const comments = await models.Comment.findAll({
			include: [models.User],
			order: ["createdAt", "DESC"]
		});
		res.status(200).send(comments);
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.deleteComment = (req, res) => {};
