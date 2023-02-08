import { expect } from 'chai'

import { registerUser } from '../helpers/registerUser'

import { apiServer, signInPath } from '../utils/config'
import { getClientUser } from '../utils/user'


describe('POST /users/signin', () => {
  it('should return 200 when signing in with valid username and password', async () => {
    const admin = 'admin'
    const response = await apiServer
      .post(signInPath)
      .send({ username: admin, password: admin })

    expect(response.status).to.eq(200)
    expect(response.body.username).to.eq('admin')
    expect(response.body.firstName).to.eq('Slawomir')
  })

  it('should return 200 when signing in with freshly created account', async () => {
    const newUser = getClientUser()
    await registerUser(newUser)

    const response = await apiServer
      .post(signInPath)
      .send({ username: newUser.username, password: newUser.password })

      expect(response.status).to.eq(200)
      expect(response.body.username).to.eq(newUser.username)
      expect(response.body.firstName).to.eq(newUser.firstName)
  })

  it('should return 400 when signing in with too short username', async () => {
    const response = await apiServer
      .post(signInPath)
      .send({ username: 'ka', password: 'admin'})

    expect(response.status).to.eq(400)
    expect(response.body).to.deep.eq({
      "username": "Minimum username length: 4 characters"
    })
  })

  it('should return 422 when signing in with invalid username and/or password', async () => {
    const response = await apiServer
      .post(signInPath)
      .send({ username: 'invalid username', password: 'invalid password' })

    expect(response.status).to.eq(422)
    expect(response.body.message).to.eq('Invalid username/password supplied')
  })
})
