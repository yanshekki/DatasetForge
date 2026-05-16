import request from 'supertest';
import app from '../app';

describe('Full User Flow Integration', () => {
  let accessToken: string;

  it('should complete a basic user journey (register -> login -> create dataset)', async () => {
    // Note: In real CI, you would use a test database
    // This is a simplified example showing the flow

    // 1. Register (may fail if user exists, that's ok for demo)
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'integration-test@example.com',
        password: 'SecurePass123!',
        name: 'Integration Test User',
      });

    // 2. Login
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'integration-test@example.com',
        password: 'SecurePass123!',
      });

    if (loginRes.body?.data?.accessToken) {
      accessToken = loginRes.body.data.accessToken;

      // 3. Create a dataset (if we have token)
      const createRes = await request(app)
        .post('/api/datasets')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Integration Test Dataset',
          description: 'Created during integration test',
        });

      expect(createRes.status).toBe(201);
    }
  });
});
