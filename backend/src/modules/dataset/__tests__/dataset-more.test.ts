import request from 'supertest';
import app from '../../app';

describe('Dataset More Tests', () => {
  it('should handle long description properly', async () => {
    const longDescription = 'A'.repeat(500);

    const res = await request(app)
      .post('/api/datasets')
      .set('Authorization', 'Bearer fake-token')
      .send({
        name: 'Long Description Test',
        description: longDescription,
      });

    expect([201, 400]).toContain(res.status);
  });
});
