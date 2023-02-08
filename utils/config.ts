import * as request from 'supertest'

// host
export const apiServer = request('http://localhost:4001')

// paths
export const signInPath = '/users/signin'
export const signUpPath = '/users/signup'
