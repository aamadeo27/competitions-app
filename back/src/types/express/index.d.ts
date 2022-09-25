import { User } from '../../typedefs/users.type'

declare namespace Express {
  export interface Request {
    user: User
    isAuthenticated: () => boolean
  }
}
