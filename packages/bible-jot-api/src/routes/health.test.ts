import request from 'supertest'
import { app } from '../app'

describe('GET /health', () => {
  it('should return a 200 status and a health message', async () => {
    const response = await request(app).get('/api/v1/health')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      message: 'Server is healthy!',
      healthy: true,
    })
  })
})
