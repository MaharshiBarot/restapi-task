const { sequelize } = require('./models');

async function test() {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Connection successful!');
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    // Close the connection
    await sequelize.close();
  }
}

test();