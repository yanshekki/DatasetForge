import request from 'supertest';
import app from '../../app';

describe('Dataset Ultimate Tests', () => {
  it('should return 401 when creating dataset without token', async () => {
    const res = await request(app)
      .post('/api/datasets')
      .send({ name: 'Test' });

    expect(res.status).toBe(401);
  });
});
