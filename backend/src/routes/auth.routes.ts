import { Router } from 'express';

const router = Router();

router.post('/register', (req, res) => {
  res.json({ message: 'Register endpoint' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint' });
});

router.get('/profile', (req, res) => {
  res.json({ message: 'Profile endpoint' });
});

export default router;
