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
    .send({ name: 'Permission Test Dataset' });
  datasetId = datasetRes.body.data.id;
});

describe('Permission Module', () => {
  it('should update dataset permission', async () => {
    const res = await request(app)
      .put(`/api/datasets/${datasetId}/permissions`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId: 2, level: 'READ' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
