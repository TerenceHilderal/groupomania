// import

const models = require("../models");
const fs = require("fs");

exports.createComment = async (req, res) => {
	try {
		let comments = req.body.comments;
		const newCom = await models.Comment.create({
			comments: comments,
			UserId: req.user.id,
			PostId: req.params.id
		});
		// if (comments.lenght == null) {
		// 	throw new Error({ error: " your comment can't be empty" });
		// }
		if (newCom) {
			res.status(201).json({ message: "Your comment has been sent", newCom });
		} else {
			throw new Error({ error: "Sorry , something gone wrong" });
		}
	} catch (err) {
		res.status(400).json({ error: "Sorry we couldn't create your comment" });
	}
};

exports.getComments = async (req, res) => {
	try {
		const order = req.query.order;
		const comments = await models.Comment.findAll({
			attributes: [
				"id",
				"comments",
				"UserId",
				"PostId",
				"createdAt",
				"updatedAt"
			],
			order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
			where: { postId: req.params.id }
		});
		if (comments) {
			res.status(200).send({ message: comments });
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

exports.deleteComment = async (req, res) => {
	try {
		const commentFound = await models.Comment.findOne({
			attributes: [
				"id",
				"comments",
				"UserId",
				"PostId",
				"createdAt",
				"updatedAt"
			],
			where: { id: req.params.id }
		});
		if (
			req.user.isAdmin == true ||
			(commentFound && commentFound.UserId == req.user.id)
		) {
			await models.Comment.destroy({ where: { id: req.params.id } });
			res
				.status(200)
				.json({ message: "Comment has been deleted ", commentFound });
		} else {
			res.status(401).json({ error: "Unauthorized action!" });
		}
	} catch (error) {
		res.status(400).send(error);
	}
};
// UPDATE PROJECT FOR FUTURE
exports.answerComment = async (req, es) => {};
