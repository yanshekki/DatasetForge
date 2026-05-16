import request from 'supertest';
import app from '../../app';

describe('Activity Log Module', () => {
  it('should return 401 when accessing activity logs without token', async () => {
    const res = await request(app).get('/api/activity-logs');
    expect(res.status).toBe(401);
  });
});
