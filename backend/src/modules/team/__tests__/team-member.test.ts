import request from 'supertest';
import app from '../../app';

describe('Team Member Management', () => {
  it('should return 401 when managing team members without token', async () => {
    const res = await request(app)
      .post('/api/teams/1/members')
      .send({ userId: 2, permissionLevel: 'READ' });

    expect(res.status).toBe(401);
  });
});
