import express from 'express';

const router = express.Router();

// Basic subscription routes placeholder
router.get('/status', (req, res) => {
  res.json({ success: true, message: 'Subscription status endpoint' });
});

export default router;
