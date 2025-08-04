const request = require('supertest');
const app = require('../src/app');

describe('Health Check Endpoint', () => {
  it('should return 200 OK with server status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('uptime');
  });
});

describe('API Info Endpoint', () => {
  it('should return API information', async () => {
    const response = await request(app).get('/api');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('endpoints');
  });
});

describe('Example Routes', () => {
  it('should return example data on GET /api/example', async () => {
    const response = await request(app).get('/api/example');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('timestamp');
  });

  it('should return example with ID on GET /api/example/:id', async () => {
    const testId = '123';
    const response = await request(app).get(`/api/example/${testId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', testId);
    expect(response.body).toHaveProperty('message');
  });

  it('should create example on POST /api/example', async () => {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
    };

    const response = await request(app).post('/api/example').send(testData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('name', testData.name);
    expect(response.body.data).toHaveProperty('email', testData.email);
  });

  it('should return 400 for POST /api/example without required fields', async () => {
    const response = await request(app)
      .post('/api/example')
      .send({ name: 'Test User' }); // Missing email

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});

describe('404 Handler', () => {
  it('should return 404 for non-existent routes', async () => {
    const response = await request(app).get('/non-existent-route');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('path');
  });
});
