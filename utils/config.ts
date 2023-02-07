import * as request from 'supertest'

// baseUrl
export const apiServer = request('http://localhost:4001')

// paths
export const usersSignInPath = '/users/signin'
