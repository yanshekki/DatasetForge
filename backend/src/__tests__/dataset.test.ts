import request from 'supertest';
import app from '../app';

let token: string;

beforeAll(async () => {
  // Login to get token
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@example.com',
      password: 'password123'
    });
  token = res.body.data.accessToken;
});

describe('Dataset Module', () => {
  it('should create a new dataset', async () => {
    const res = await request(app)
      .post('/api/datasets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Dataset',
        description: 'This is a test dataset'
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('should get all datasets for user', async () => {
    const res = await request(app)
      .get('/api/datasets')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
