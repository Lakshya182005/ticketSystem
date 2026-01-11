const User = require('../models/User');

const usersList = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const users = await User.find().select('-password');
  res.json(users);
};


const updateRole = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { role } = req.body;
  const allowedRoles = ['customer', 'agent', 'admin'];

  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select('-password');

  res.json(user);
};

module.exports = {
  usersList,
  updateRole
};
