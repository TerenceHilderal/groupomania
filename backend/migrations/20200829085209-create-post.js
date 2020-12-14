"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Posts", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				onDelete: "cascade",
				type: Sequelize.INTEGER
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "Users",
					key: "id"
				}
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING
			},
			content: {
				allowNull: false,
				type: Sequelize.STRING
			},
			attachment: {
				type: Sequelize.STRING
			},
			isModerate: {
				type: Sequelize.BOOLEAN
			},

			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Posts");
	}
};
