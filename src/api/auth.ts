import http from './http'
import { Response } from './types'
import { loginResult } from './types/auth'

export function login(user: string, pwd: string) {
  return http.post<loginResult, Response<loginResult>>('/login', { username: user, password: pwd })
}
