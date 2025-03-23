const db = require('../models');
const Group = db.Group;
const Member = db.Member;

exports.createGroup = async (req, res) => {
  try {
    const group = await Group.create({ name: req.body.name });
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: 'Group creation failed' });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    await Group.destroy({ where: { id: req.params.groupId } });
    res.json({ message: 'Group deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
};

exports.addMemberToGroup = async (req, res) => {
    try {
      const { groupId, memberId } = req.params;
  
      console.log('Adding member to group:', { groupId, memberId });
  
      // Check if group and member exist
      const [group, member] = await Promise.all([
        db.Group.findByPk(groupId),
        db.Member.findByPk(memberId)
      ]);
  
      if (!group || !member) {
        console.error('Group or Member not found');
        return res.status(404).json({ error: 'Group or Member not found' });
      }
  
      console.log('Group and Member found:', { group, member });
  
      // Add member to group
      await group.addMember(member);
      console.log('Member added to group successfully');
  
      res.json({ message: 'Member added to group' });
    } catch (error) {
      console.error('Error adding member to group:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.removeMemberFromGroup = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.groupId);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    await group.removeMember(req.params.memberId);
    res.json({ message: 'Member removed from group' });
  } catch (error) {
    res.status(500).json({ error: 'Operation failed' });
  }
};

exports.getGroupMembers = async (req, res) => {
    try {
      const groupsWithMembers = await db.Group.findAll({
        include: [{
          model: db.Member,
          attributes: ['id', 'name'],
          through: { attributes: [] } // Hide GroupMembers details
        }],
        attributes: ['id', 'name'] // Only include group ID and name
      });
  
      // Format the response
      const formattedData = groupsWithMembers.map(group => ({
        group_id: group.id,
        group_name: group.name,
        members: group.Members.map(member => ({
          member_id: member.id,
          member_name: member.name
        }))
      }));
  
      res.json(formattedData);
    } catch (error) {
      console.error('Error fetching group members:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };