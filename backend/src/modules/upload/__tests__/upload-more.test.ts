import request from 'supertest';
import app from '../../app';

describe('Upload Module Enhanced Tests', () => {
  it('should handle invalid presigned URL requests', async () => {
    const res = await request(app)
      .post('/api/upload/presigned-url')
      .set('Authorization', 'Bearer fake-token')
      .send({});

    expect(res.status).toBe(400);
  });
});
