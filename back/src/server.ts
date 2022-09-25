import App from '@/app'
import validateEnv from '@utils/validateEnv'

import { UserResolver } from '@resolvers/users.resolver'
import { CompetitionResolver } from '@resolvers/competitions.resolver'
import { MatchResolver } from '@resolvers/competition-matches.resolver'
import AuthRoute from './routes/auth.route'
import UIRoute from './routes/ui.route'

validateEnv()

const app = new App([UserResolver, CompetitionResolver, MatchResolver], [new AuthRoute(), new UIRoute()])

app.listen()
