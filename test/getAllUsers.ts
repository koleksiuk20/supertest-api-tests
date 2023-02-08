import { expect } from "chai"

import { registerUser } from "../helpers/registerUser"
import { signInUser } from "../helpers/signInUser"

import { apiServer } from "../utils/config"
import { getAdminUser, getClientUser } from "../utils/user"


describe('GET /users', () => {
  it('should return 200 for signed in admin user', async () => {
    const newAdminUser = getAdminUser()
    await registerUser(newAdminUser)
    const token = await signInUser(newAdminUser)

    const response = await apiServer
      .get('/users')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).to.eq(200)
  })

  it('should return 200 for signed in client user', async () => {
    const newClientUser = getClientUser()
    await registerUser(newClientUser)
    const token = await signInUser(newClientUser)

    const response = await apiServer
      .get('/users')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).to.eq(200)
  })

  it('should return 403 for invalid token', async () => {
    const newUser = getClientUser()
    await registerUser(newUser)
    const token = await signInUser(newUser)

    const response = await apiServer
      .get('/users')
      .set('Authorization', `Bearer ${token}as`)

    expect(response.status).to.eq(403)
  })
})
