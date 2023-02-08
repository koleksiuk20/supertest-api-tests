import { apiServer } from "../utils/config"
import { signInPath } from "../utils/config"

import { User } from "../utils/user"

export const signInUser = async (user: User) => {
  const request = await apiServer
    .post(signInPath)
    .send({ username: user.username, password: user.password })

  return request.body.token
}
