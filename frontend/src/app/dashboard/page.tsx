'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState({ title: '', description: '' });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userStr || !token) {
      router.push('/login');
      return;
    }
    
    setUser(JSON.parse(userStr));
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5005/api/issues', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIssues(response.data);
    } catch (err) {
      console.error('Failed to fetch issues');
    }
  };

  const createIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5005/api/issues', newIssue, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewIssue({ title: '', description: '' });
      fetchIssues();
    } catch (err) {
      console.error('Failed to create issue');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Welcome, {user.name}!</h1>
        <button onClick={logout}>Logout</button>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Create New Issue</h2>
        <form onSubmit={createIssue}>
          <input
            type="text"
            placeholder="Title"
            value={newIssue.title}
            onChange={(e) => setNewIssue({...newIssue, title: e.target.value})}
            style={{ marginRight: '10px', padding: '5px' }}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newIssue.description}
            onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button type="submit">Create Issue</button>
        </form>
      </div>

      <div>
        <h2>Issues</h2>
        {issues.length === 0 ? (
          <p>No issues yet</p>
        ) : (
          <ul>
            {issues.map((issue: any) => (
              <li key={issue.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
                <h3>{issue.title}</h3>
                <p>{issue.description}</p>
                <small>Status: {issue.status} | Priority: {issue.priority}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
