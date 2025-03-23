const db = require('../models');
const Member = db.Member;

exports.createMember = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const member = await Member.create({ name });
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: 'Member creation failed' });
  }
};

exports.deleteMember = async (req, res) => {
    try {
      const memberId = req.params.memberId;
      const member = await db.Member.findByPk(memberId);
  
      if (!member) {
        return res.status(404).json({ error: "Member not found" });
      }
  
      await member.destroy();
      res.json({ message: "Member deleted successfully" });
    } catch (error) {
      console.error("Error deleting member:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };