import express from 'express';

const router = express.Router();

// Basic user routes placeholder
router.get('/profile', (req, res) => {
  res.json({ success: true, message: 'User profile endpoint' });
});

export default router;
