import request from 'supertest';
import app from '../app';

describe('Dataset CRUD Integration', () => {
  it('should handle dataset creation validation properly', async () => {
    const res = await request(app)
      .post('/api/datasets')
      .set('Authorization', 'Bearer fake-token')
      .send({
        name: '', // empty name should fail
        description: 'Test',
      });

    expect(res.status).toBe(400);
  });
});
