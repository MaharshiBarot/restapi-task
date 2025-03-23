module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GroupMembers', {
      group_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Groups',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      member_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Members',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Add indexes
    await queryInterface.addIndex('GroupMembers', ['group_id']);
    await queryInterface.addIndex('GroupMembers', ['member_id']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('GroupMembers');
  }
};

