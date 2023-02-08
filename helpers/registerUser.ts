import { apiServer } from "../utils/config"
import { User } from "../utils/user"

export const registerUser = async (user: User) => {
  await apiServer
    .post('/users/signup')
    .send(user)
}
