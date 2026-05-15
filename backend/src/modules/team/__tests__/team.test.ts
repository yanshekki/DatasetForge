import request from 'supertest';
import app from '../../app';

describe('Team Module', () => {
  it('should return 401 when accessing teams without token', async () => {
    const res = await request(app).get('/api/teams');
    expect(res.status).toBe(401);
  });
});
