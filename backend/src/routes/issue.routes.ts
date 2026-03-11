import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json([]);
});

router.post('/', (req, res) => {
  res.status(201).json({ id: '1', ...req.body });
});

export default router;
