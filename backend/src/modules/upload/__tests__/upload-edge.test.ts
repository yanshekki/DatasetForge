import request from 'supertest';
import app from '../../app';

describe('Upload Edge Cases', () => {
  it('should return 400 when deleting file with missing parameters', async () => {
    const res = await request(app)
      .post('/api/upload/delete')
      .set('Authorization', 'Bearer fake-token')
      .send({});

    expect(res.status).toBe(400);
  });
});
