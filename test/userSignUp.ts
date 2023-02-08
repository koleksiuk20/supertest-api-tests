import { expect } from "chai"

import { apiServer, signUpPath } from "../utils/config"
import { getClientUser } from '../utils/user'

describe('POST /users/signup', () => {
  it('should return 201 created', async () => {
    const newUser = getClientUser()
    const response = await apiServer
      .post(signUpPath)
      .send(newUser)

    expect(response.status).to.eq(201)
    expect(response.body.token).to.not.be.undefined
  })
})
