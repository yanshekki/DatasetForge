import request from 'supertest';
import app from '../../app';

describe('Dataset Edge Cases', () => {
  it('should return 400 when creating dataset without name', async () => {
    // This assumes we have a way to get a valid token in real tests
    const res = await request(app)
      .post('/api/datasets')
      .set('Authorization', 'Bearer fake-token')
      .send({
        description: 'Missing name field',
      });

    expect(res.status).toBe(400);
  });
});
