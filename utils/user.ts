import { faker } from '@faker-js/faker'
import { Roles } from './roles'

export interface User {
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string,
  roles: Roles[]
}

export const getAdminUser = (): User => {
  return {
    username: faker.internet.userName('Kath'),
    password: faker.internet.password(8),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    roles: [Roles.ROLE_ADMIN]
  }
}

export const getClientUser = (): User => {
  return {
    ...getAdminUser(),
    roles: [Roles.ROLE_CLIENT]
  }
}
