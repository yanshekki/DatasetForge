import request from 'supertest';
import app from '../../app';

describe('Upload Module', () => {
  it('should return 401 when getting presigned URL without token', async () => {
    const res = await request(app)
      .post('/api/upload/presigned-url')
      .send({
        datasetId: 1,
        version: 'v1',
        fileName: 'test.csv',
      });

    expect(res.status).toBe(401);
  });
});
