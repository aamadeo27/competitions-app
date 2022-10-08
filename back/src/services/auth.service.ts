import { auth } from '@config'
import Steam from 'passport-steam'
import { Strategy as JwtStrategy } from 'passport-jwt'
import passport from 'passport'
import UserService from './users.service'
import TokenService from './token.service'
import { NextFunction, Request, Response } from 'express'
import { HttpException } from '@/exceptions/HttpException'
import { logger } from '@/utils/logger'
const userService = new UserService()

passport.use(
  'steam',
  new Steam.Strategy(auth.steam, (_, profile, done) => {
    process.nextTick(async () => {
      try {
        await userService.connect({
          steamId: profile.id,
          name: profile.personaname,
          avatar: profile.avatarfull,
        })

        return done(null, profile)
      } catch (error) {
        logger.error('Error occured while trying to authenticate with steam')
        done(error)
      }
    })
  }),
)

passport.use(
  'jwt',
  new JwtStrategy(
    {
      secretOrKey: auth.jwtSecret,
      jwtFromRequest: (req: Request) => (req && req.cookies ? req.cookies['token'] : null),
    },
    (user, done) => {
      try {
        // Check for user.id
        if (!user) done(null, false)

        return done(null, user)
      } catch (error) {
        done(error)
      }
    },
  ),
)

export default class AuthService {
  private tokenSvc = new TokenService()

  public steam = (req: Request, res: Response, next: NextFunction) => {
    try {
      passport.authenticate(
        'steam',
        { session: false, failureRedirect: '/login', successRedirect: '/' },
        async (error, user) => {
          if (error) {
            logger.error(error)
            return next(new HttpException(500, `Error in authentication:`))
          }

          await this.tokenSvc.storeToken(user, res)

          next()
        },
      )(req, res, next)
    } catch (error) {
      next(error)
    }
  }

  public jwt = (browser: boolean) => (req: Request, res: Response, next: NextFunction) => {
    try {
      passport.authenticate('jwt', {
        session: false,
        ...(browser ? { failureRedirect: '/login' } : {}),
      })(req, res, next)
    } catch (error) {
      next(error)
    }
  }

  public logout = (req: Request, res: Response) => {
    this.tokenSvc.clearToken(res)
    res.redirect('/login')
  }
}
