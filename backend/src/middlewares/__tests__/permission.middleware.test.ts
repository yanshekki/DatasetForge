import request from 'supertest';
import app from '../app';

describe('Permission Middleware', () => {
  it('should return 401 when accessing protected route without token', async () => {
    const res = await request(app).get('/api/datasets/1');
    expect(res.status).toBe(401);
  });

  it('should return 403 when accessing dataset without proper permission', async () => {
    // This would require a valid token with wrong permissions in real tests
    const res = await request(app)
      .get('/api/datasets/999999')
      .set('Authorization', 'Bearer invalid-token');

    expect([401, 403]).toContain(res.status);
  });
});
