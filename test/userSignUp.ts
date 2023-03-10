import { expect } from "chai"

import { registerUser } from "../helpers/registerUser"

import { apiServer, signUpPath } from "../utils/config"
import { getAdminUser, getClientUser } from '../utils/user'


describe('POST /users/signup', () => {
  it('should return 201 created when signing up as client user', async () => {
    const newClientUser = getClientUser()

    const response = await apiServer
      .post(signUpPath)
      .send(newClientUser)

    expect(response.status).to.eq(201)
    expect(response.body.token).to.not.be.undefined
  })

  it('should return 201 created when signing up as admin user', async () => {
    const newAdminUser = getAdminUser()

    const response = await apiServer
      .post(signUpPath)
      .send(newAdminUser)

    expect(response.status).to.eq(201)
    expect(response.body.token).to.not.be.undefined
  })

  it('should return 400 when signing up with too short username or password', async () => {
    const response = await apiServer
      .post(signUpPath)
      .send({
        ...getClientUser(),
        username: 'Abc',
        password: 'abc'
      })

    expect(response.status).to.eq(400)
    expect(response.body).to.deep.eq({
      "password": "Minimum password length: 4 characters",
      "username": "Minimum username length: 4 characters"
    })
  })

  it('should return 422 when signing up with username already taken', async () => {
    const newClientUser = getClientUser()
    await registerUser(newClientUser)

    const response = await apiServer
      .post('/users/signup')
      .send({
        ...getClientUser(),
        username: newClientUser.username
      })

    expect(response.status).to.eq(422)
    expect(response.body.message).to.deep.eq('Username is already in use')
  })
})
