const Group = require('../models/Group');

// List groups (optionally filter by userId)
exports.listGroups = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const filter = {};
    if (userId) filter.members = userId;

    const groups = await Group.find(filter).populate('members createdBy');
    return res.json(groups);
  } catch (err) {
    return next(err);
  }
};

// Create group
exports.createGroup = async (req, res, next) => {
  try {
    const { name, members, createdBy, description, settings } = req.body;
    if (!name) return res.status(400).json({ message: 'name is required' });

    // Prefer explicit createdBy but fall back to authenticated user from token
    const creator = createdBy || (req.user && req.user.id);
    if (!creator) return res.status(401).json({ message: 'Authentication required to create group' });

    // Ensure creator is part of members
    const memberList = Array.isArray(members) ? members.slice() : [];
    if (!memberList.find(m => String(m) === String(creator))) memberList.push(creator);

    const group = await Group.create({ name, members: memberList, createdBy: creator, description, settings });
    return res.status(201).json(group);
  } catch (err) {
    return next(err);
  }
};

// Delete group
exports.deleteGroup = async (req, res, next) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    return res.json({ message: 'Group deleted successfully' });
  } catch (err) {
    return next(err);
  }
};
