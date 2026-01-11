const Ticket = require('../models/Ticket');
const Comment = require('../models/Comment');

const createTicket = async (req, res) => {
  if (req.user.role !== 'customer') {
    return res.status(403).json({ message: 'Only customers can create tickets' });
  }

  const { title, description, categoryId } = req.body;

  const ticket = await Ticket.create({
    title,
    description,
    categoryId,
    customerId: req.user.id
  });

  res.status(201).json(ticket);
};


const myTickets = async (req, res) => {
  if (req.user.role !== 'customer') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const tickets = await Ticket.find({ customerId: req.user.id });
  res.json(tickets);
};

const allTickets = async (req, res) => {
  if (req.user.role === 'customer') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const tickets = await Ticket.find()
    .populate('categoryId', 'name')
    .populate('assignedAgentId', 'name email');

  res.json(tickets);
};


const findTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
    .populate('categoryId', 'name')
    .populate('assignedAgentId', 'name email');

  if (!ticket) {
    return res.status(404).json({ message: 'Ticket not found' });
  }

  if (
    req.user.role === 'customer' &&
    ticket.customerId.toString() !== req.user.id
  ) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const commentFilter =
    req.user.role === 'customer'
      ? { ticketId: ticket._id, isInternal: false }
      : { ticketId: ticket._id };

  const comments = await Comment.find(commentFilter).sort({ createdAt: 1 });

  res.json({
    ticket,
    comments
  });
};


const changeStatus = async (req, res) => {
  if (req.user.role === 'customer') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const allowedStatus = ['new', 'in-progress', 'resolved'];
  if (!allowedStatus.includes(req.body.status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(ticket);
};


const changeSeverity = async (req, res) => {
  if (req.user.role === 'customer') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const severities = ['low', 'medium', 'high', 'critical'];
  if (!severities.includes(req.body.severity)) {
    return res.status(400).json({ message: 'Invalid severity value' });
  }

  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { severity: req.body.severity },
    { new: true }
  );

  res.json(ticket);
};


const changeCategory = async (req, res) => {
  if (req.user.role === 'customer') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { categoryId: req.body.categoryId },
    { new: true }
  );

  res.json(ticket);
};


const assignAgent = async (req, res) => {
  if (req.user.role === 'customer') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const ticket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { assignedAgentId: req.body.agentId },
    { new: true }
  );

  res.json(ticket);
};

module.exports = {
  createTicket,
  myTickets,
  allTickets,
  findTicket,
  changeStatus,
  changeSeverity,
  changeCategory,
  assignAgent
};
