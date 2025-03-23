module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First add the column allowing NULL
    await queryInterface.addColumn('Members', 'name', {
      type: Sequelize.STRING,
      allowNull: true // Temporary allow NULL
    });

    // Update existing records with default value
    await queryInterface.sequelize.query(
      'UPDATE "Members" SET "name" = \'Anonymous\' WHERE "name" IS NULL;'
    );

    // Now set the column to NOT NULL
    await queryInterface.changeColumn('Members', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Members', 'name');
  }
};