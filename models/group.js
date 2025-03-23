module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    });
  
    Group.associate = models => {
        Group.belongsToMany(models.Member, {
          through: models.GroupMember, // Explicitly reference the junction model
          foreignKey: 'group_id',
          otherKey: 'member_id'
        });
      };
    return Group;
  };