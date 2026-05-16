import request from 'supertest';
import app from '../app';

let token: string;
let datasetId: number;

beforeAll(async () => {
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'test@example.com', password: 'password123' });
  token = loginRes.body.data.accessToken;

  const datasetRes = await request(app)
    .post('/api/datasets')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Comment Test Dataset' });
  datasetId = datasetRes.body.data.id;
});

describe('Comment Module', () => {
  it('should create a comment', async () => {
    const res = await request(app)
      .post(`/api/datasets/${datasetId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'This is a test comment' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('should get all comments for a dataset', async () => {
    const res = await request(app)
      .get(`/api/datasets/${datasetId}/comments`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
