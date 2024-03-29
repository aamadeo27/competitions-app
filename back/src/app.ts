import 'reflect-metadata'
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Request } from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import { buildSchema } from 'type-graphql'
import { NODE_ENV, PORT, CREDENTIALS } from '@config'
import { authMiddleware, authChecker } from '@middlewares/auth.middleware'
import errorMiddleware from '@middlewares/error.middleware'
import { logger, responseLogger, errorLogger } from '@utils/logger'
import passport from 'passport'
import { Routes } from '@interfaces/routes.interface'

class App {
  public app: express.Application
  public env: string
  public port: string | number

  constructor(resolvers, routes: Routes[]) {
    this.app = express()
    this.env = NODE_ENV || 'development'
    this.port = PORT || 3000

    this.initializeMiddlewares(routes)
    this.initApolloServer(resolvers)
    this.initializeErrorHandling()
  }

  public async listen() {
    return this.app.listen(this.port, () => {
      logger.info(`=================================`)
      logger.info(`======= ENV: ${this.env} =======`)
      logger.info(`🚀 App listening on the port ${this.port}`)
      logger.info(`🎮 http://localhost:${this.port}/graphql`)
      logger.info(`🏡 http://localhost:${this.port}/`)
      logger.info(`=================================`)
    })
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router)
    })
  }

  public getServer() {
    return this.app
  }

  private initializeMiddlewares(routes: Routes[]) {
    if (this.env === 'production') {
      this.app.use(hpp())
      this.app.use(helmet())
    }

    this.app.use(cors({ origin: [/^http:\/\/localhost:\d*/], credentials: CREDENTIALS }))
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
    this.app.use(passport.initialize())
    this.initializeRoutes(routes)
    this.app.use('/', express.static('./public'))
  }

  private async initApolloServer(resolvers) {
    const schema = await buildSchema({
      resolvers,
      authChecker,
    })

    const apolloServer = new ApolloServer({
      schema,
      plugins: [
        this.env === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
          : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      ],
      context: async ({ req }: { req: Request }) => {
        try {
          const user = await authMiddleware(req)

          logger.info('User: ' + user)

          return { user }
        } catch (error) {
          return null
        }
      },
      formatResponse: (response, request) => {
        responseLogger(request)

        return response
      },
      formatError: error => {
        errorLogger(error)

        return error
      },
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({
      app: this.app,
      cors: {
        origin: ['http://localhost:5000', 'http://localhost:3000'],
      },
      path: '/graphql',
    })
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }
}

export default App
