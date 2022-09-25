import { Request, Response, Router } from 'express'
import { Routes } from '@interfaces/routes.interface'
import AuthService from '@services/auth.service'

class AuthRoute implements Routes {
  public path = '/auth'
  public router = Router()
  public authService = new AuthService()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/return`, this.authService.steam, (req: Request, res: Response) => {
      res.redirect('/')
    })
    this.router.get(`${this.path}/`, this.authService.steam, (req: Request, res: Response) => {
      res.redirect('/')
    })

    this.router.get(`${this.path}/profile`, this.authService.jwt(false), (req: Request, res: Response) => {
      const user = req['user']
      if (!user) {
        return res.status(401).json({ status: 'Unauthorized' })
      }

      const {
        id,
        displayName,
        photos,
        _json: { profileurl, realname, loccountrycode },
      } = user

      return res.json({ id, displayName, photos, profileurl, realname, loccountrycode })
    })

    this.router.get(`${this.path}/logout`, this.authService.logout)
  }
}

export default AuthRoute
