import request from 'supertest';
import app from '../../app';

describe('Upload Final Tests', () => {
  it('should return 401 when accessing upload without token', async () => {
    const res = await request(app)
      .post('/api/upload/presigned-url')
      .send({});

    expect(res.status).toBe(401);
  });
});
