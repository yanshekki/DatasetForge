import request from 'supertest';
import app from '../../app';

describe('Auth Module', () => {
  it('should return 400 when registering with invalid data', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'invalid-email',
        password: '123',
      });

    expect(res.status).toBe(400);
  });

  it('should return 400 when logging in with missing fields', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
      });

    expect(res.status).toBe(400);
  });
});
