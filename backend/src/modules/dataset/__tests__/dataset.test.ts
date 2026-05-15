import request from 'supertest';
import app from '../../app';

describe('Dataset Module', () => {
  let token: string;

  beforeAll(async () => {
    // In real tests, you would create a test user and get a token
    // This is a simplified example
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    token = loginRes.body?.data?.accessToken || '';
  });

  it('should return 401 when accessing datasets without token', async () => {
    const res = await request(app).get('/api/datasets');
    expect(res.status).toBe(401);
  });

  it('should return 400 when creating dataset with invalid data', async () => {
    const res = await request(app)
      .post('/api/datasets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        // missing name
        description: 'Test dataset',
      });

    expect(res.status).toBe(400);
  });
});
