import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Simple auth routes
app.post('/api/auth/register', (req, res) => {
  const { email, password, name, tenantName } = req.body;
  res.json({ 
    token: 'test-token',
    user: { 
      id: '1', 
      email, 
      name, 
      role: 'USER',
      tenantId: '1',
      tenantName 
    } 
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  res.json({ 
    token: 'test-token',
    user: { 
      id: '1', 
      email, 
      name: 'Test User', 
      role: 'USER',
      tenantId: '1',
      tenantName: 'Test Company'
    } 
  });
});

// Simple issues routes
app.get('/api/issues', (req, res) => {
  res.json([
    {
      id: '1',
      title: 'Sample Issue',
      description: 'This is a test issue',
      status: 'OPEN',
      priority: 'MEDIUM',
      createdAt: new Date().toISOString(),
      createdBy: { name: 'Test User' },
      assignedTo: null
    }
  ]);
});

app.post('/api/issues', (req, res) => {
  const { title, description, priority } = req.body;
  res.status(201).json({
    id: Date.now().toString(),
    title,
    description,
    priority,
    status: 'OPEN',
    createdAt: new Date().toISOString(),
    createdBy: { name: 'Test User' },
    assignedTo: null
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
});
