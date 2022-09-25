import { Request, Response, Router } from 'express'
import { Routes } from '@interfaces/routes.interface'
import path from 'path'
import AuthService from '@/services/auth.service'

const root = path.dirname(path.dirname(__dirname))
const uiController = (req: Request, res: Response) => {
  res.sendFile(path.join(root, 'public/index.html'))
}

const restricted = ['/', '/calendar', '/match']
const open = ['/login']

class UIRoute implements Routes {
  public path = '/'
  public router = Router()
  authService = new AuthService()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    open.forEach(r => this.router.get(r, uiController))
    restricted.forEach(r => this.router.get(r, this.authService.jwt(true), uiController))
  }
}

export default UIRoute
