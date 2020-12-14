"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Post.hasMany(
				models.Comment,
				{ foreignKey: "id_posts" },
				{ onDelete: "cascade" }
			);

			models.Post.belongsTo(models.User, {
				foreignKey: {
					allowNull: false
				}
			});
		}
	}
	Post.init(
		{
			title: DataTypes.STRING,
			content: DataTypes.STRING,
			isModerate: DataTypes.BOOLEAN,
			attachment: { type: DataTypes.STRING, allowNull: true }
		},
		{
			sequelize,
			modelName: "Post"
		}
	);
	return Post;
};
