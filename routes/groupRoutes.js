const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authenticate = require('../middleware/auth');

router.post('/', authenticate, groupController.createGroup);
router.delete('/:groupId', authenticate, groupController.deleteGroup);
router.post('/:groupId/members/:memberId', authenticate, groupController.addMemberToGroup);
router.delete('/:groupId/members/:memberId', authenticate, groupController.removeMemberFromGroup);
router.get('/group-members', authenticate, groupController.getGroupMembers);

module.exports = router;