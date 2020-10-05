// import

const models = require("../models");
const fs = require("fs");

exports.createComment = async (req, res) => {
	try {
		let comments = req.body.comments;
		const newCom = await models.Comment.create({
			include: [
				{
					model: models.User,
					attributes: ["username"]
				}
			],
			comments: comments,
			UserId: req.user.id,
			PostId: req.params.id
		});

		if (newCom) {
			res.status(201).json({ message: "Your comment has been sent", newCom });
		} else {
			throw new Error("Sorry , something gone wrong");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
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
		} else {
			throw new Error("There are no comments");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
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
		// 	if (
		// 		req.user.isAdmin == true ||
		// 		(commentFound && commentFound.UserId == req.user.id)
		// 	) {
		// 		await models.Comment.destroy({ where: { id: req.params.id } });
		// 		res
		// 			.status(200)
		// 			.json({ message: "Comment has been deleted ", commentFound });
		// 	} else {
		// 		throw new Error({ error: "Couldn't delete your comment" });
		// 	}req.user.isAdmin !== true&&
		// if (commentFound.UserId !== req.user.id) {
		// 	throw new Error("Unauthorized action");
		// }
		await models.Comment.destroy({
			where: { id: req.params.id }
		});
		res.status(200).json({ message: "Comment has been deleted " });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
	// try {
	// 	const commentFound = await models.Comment.findOne({
	// 		attributes: [
	// 			"id",
	// 			"comments",
	// 			"UserId",
	// 			"PostId",
	// 			"createdAt",
	// 			"updatedAt"
	// 		],
	// 		where: { id: req.params.id }
	// 	});
	// 	if (
	// 		req.user.isAdmin == true ||
	// 		(commentFound && commentFound.UserId == req.user.id)
	// 	) {
	// 		await models.Comment.destroy({ where: { id: req.params.id } });
	// 		res
	// 			.status(200)
	// 			.json({ message: "Comment has been deleted ", commentFound });
	// 	} else {
	// 		res.status(401).json({ error: "Unauthorized action!" });
	// 	}
	// } catch (error) {
	// 	res.status(400).send(error);
	// }
};
// UPDATE PROJECT FOR FUTURE
exports.answerComment = async (req, es) => {};
