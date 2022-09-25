import { User } from '@interfaces/users.interface'

export interface DataStoredInToken {
  id: string
}

export interface TokenData {
  token: string
  expiresIn: number
}

export interface AuthRequest {
  user: User
  isAuthenticated: () => boolean
}
