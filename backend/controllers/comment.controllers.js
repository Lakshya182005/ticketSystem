const Comment = require('../models/Comment');

const newComment = async (req, res) => {
  const { content, isInternal = false } = req.body;

  if (req.user.role === 'customer' && isInternal) {
    return res.status(403).json({
      message: 'Customers cannot add internal comments'
    });
  }

  const comment = await Comment.create({
    ticketId: req.params.id,
    authorId: req.user.id,
    authorRole: req.user.role,
    content,
    isInternal
  });

  res.status(201).json(comment);
};

module.exports = {
  newComment
};
