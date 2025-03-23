module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define('Member', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Member.associate = models => {
        Member.belongsToMany(models.Group, {
          through: models.GroupMember, // Explicitly reference the junction model
          foreignKey: 'member_id',
          otherKey: 'group_id'
        });
      };
      
    return Member;
  };