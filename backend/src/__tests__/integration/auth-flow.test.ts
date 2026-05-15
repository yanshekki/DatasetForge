import request from 'supertest';
import app from '../app';

describe('Auth Flow Integration', () => {
  it('should handle invalid login gracefully', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword',
      });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('should reject registration with weak password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'newuser@example.com',
        password: '123', // too short
        name: 'Test User',
      });

    expect(res.status).toBe(400);
  });
});
