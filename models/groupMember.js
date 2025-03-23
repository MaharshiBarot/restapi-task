module.exports = (sequelize, DataTypes) => {
    const GroupMember = sequelize.define('GroupMember', {
      group_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      member_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      }
    }, {
      timestamps: true, // Enable createdAt
      updatedAt: false, // Disable updatedAt
      tableName: 'GroupMembers' // Explicitly set the table name
    });

    GroupMember.associate = models => {
        GroupMember.belongsTo(models.Group, {
          foreignKey: 'group_id'
        });
        GroupMember.belongsTo(models.Member, {
          foreignKey: 'member_id'
        });
      };
  
    return GroupMember;
  };