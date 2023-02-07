import { apiServer, usersSignInPath } from '../utils/config'
import { expect } from 'chai'

describe('POST /users/signin', () => {
  it('should return 200 when signing in with valid username and password', async () => {
    const admin = 'admin'
    const response = await apiServer
      .post(usersSignInPath)
      .send({ username: admin, password: admin })

    expect(response.status).to.eq(200)
    expect(response.body.username).to.eq('admin')
    expect(response.body.firstName).to.eq('Jan')
  })

  it('should return 400 when signing in with too short username and/or password', async () => {
    const response = await apiServer
      .post(usersSignInPath)
      .send({ username: 'Te', password: 'St' })

    expect(response.status).to.eq(400)
    expect(response.body).to.deep.eq({
      "password": "Minimum password length: 4 characters",
      "username": "Minimum username length: 4 characters"
    })
  })

  it('should return 422 when signing in with invalid username and/or password', async () => {
    const invalidData = 'invalid data'
    const response = await apiServer
      .post(usersSignInPath)
      .send({ username: invalidData, password: invalidData })

    expect(response.status).to.eq(422)
    expect(response.body.message).to.eq('Invalid username/password supplied')
  })
})
