import request from 'supertest';
import app from '../app';

describe('Permission Middleware Enhanced', () => {
  it('should protect upload endpoints', async () => {
    const res = await request(app)
      .post('/api/upload/presigned-url')
      .send({});

    expect(res.status).toBe(401);
  });

  it('should protect dataset version endpoints', async () => {
    const res = await request(app)
      .get('/api/datasets/1/versions');
    expect(res.status).toBe(401);
  });
});
