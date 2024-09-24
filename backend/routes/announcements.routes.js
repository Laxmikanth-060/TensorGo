import express from 'express';
import { Announcement } from '../models/announcements.model.js'; 
import { protectRoute } from '../middleware/protectRoute.js'; 

const router = express.Router();

// Middleware to check if user is super admin
const isSuperAdminFun = (req, res, next) => {
  // console.log('User:', req.user);
  if (req.user && req.user.isSuperAdmin) {
    next();
  } else {
    return res.status(403).json({ message: 'Forbidden' });
  }
};

// Get all announcements (No admin check here, just need to be authenticated)
router.get('/', protectRoute, async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create an announcement (Need to be authenticated and a super admin)
router.post('/', protectRoute, isSuperAdminFun, async (req, res) => {
  console.log('Request body:', req.body);
  const { content } = req.body;
  try {
    const announcement = new Announcement({ content });
    await announcement.save();
    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
});

// Delete an announcement (Authenticated and super admin only)
router.delete('/:id', protectRoute, isSuperAdminFun, async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
    res.json({ message: 'Announcement deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
