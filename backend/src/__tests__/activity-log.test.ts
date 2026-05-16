import request from 'supertest';
import app from '../app';

let token: string;

beforeAll(async () => {
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'test@example.com', password: 'password123' });
  token = loginRes.body.data.accessToken;
});

describe('Activity Log Module', () => {
  it('should get activity logs', async () => {
    const res = await request(app)
      .get('/api/activity-logs')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should get activity heatmap', async () => {
    const res = await request(app)
      .get('/api/activity-logs/heatmap')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
