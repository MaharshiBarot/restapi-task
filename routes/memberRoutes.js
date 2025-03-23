const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const authenticate = require('../middleware/auth');

// Create a new member
router.post('/', authenticate, memberController.createMember);
router.delete('/:memberId', authenticate, memberController.deleteMember);

module.exports = router;