import { apiServer } from '../utils/config'
import { expect } from 'chai'

describe('POST /users/signin', () => {
  it('should return 200 when valid username and password', async () => {
    const admin = 'admin'
    const response = await apiServer
      .post('/users/signin')
      .send({ username: admin, password: admin })

    expect(response.status).to.eq(200)
    expect(response.body.username).to.eq('admin')
    expect(response.body.firstName).to.eq('Jan')
  })

  it('should return 422 when invalid username and/or password', async () => {
    const response = await apiServer
      .post('/users/signin')
      .send({ username: 'invalid username', password: 'invalid password' })

    expect(response.status).to.eq(422)
    expect(response.body.message).to.eq('Invalid username/password supplied')
  })
})
