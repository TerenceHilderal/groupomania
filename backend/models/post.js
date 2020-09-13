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
			models.Post.hasMany(models.Comment, { foreignKey: "id_posts" });

			models.Post.belongsTo(models.User, {
				foreignKey: {
					allowNull: false
				}
			});
		}
	}
	Post.init(
		{
			// id_users: DataTypes.INTEGER,
			title: DataTypes.STRING,
			content: DataTypes.STRING,
			attachment: { type: DataTypes.STRING, allowNull: true }
		},
		{
			sequelize,
			modelName: "Post"
		}
	);
	return Post;
};
