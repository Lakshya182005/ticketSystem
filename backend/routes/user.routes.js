const express = require('express');
const router = express.Router();
const {validateId} = require('../middlewares/validateId');

const {
  usersList,
  updateRole
} = require('../controllers/user.controllers');

const { requireAuth } = require('../middlewares/auth');

router.get('/', requireAuth, usersList);
router.patch('/:id/role', requireAuth, validateId(), updateRole);

module.exports = router;
