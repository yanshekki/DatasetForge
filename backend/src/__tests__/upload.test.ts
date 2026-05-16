import request from 'supertest';
import app from '../app';

let token: string;

beforeAll(async () => {
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'test@example.com', password: 'password123' });
  token = loginRes.body.data.accessToken;
});

describe('Upload Module', () => {
  it('should get presigned upload URL', async () => {
    const res = await request(app)
      .post('/api/upload/presigned-url')
      .set('Authorization', `Bearer ${token}`)
      .send({
        fileName: 'test-file.txt',
        contentType: 'text/plain'
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.presignedUrl).toBeDefined();
  });
});
