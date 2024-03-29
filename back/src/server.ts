import App from '@/app'
import validateEnv from '@utils/validateEnv'

import { UserResolver } from '@resolvers/users.resolver'
import { CompetitionResolver } from '@resolvers/competitions.resolver'
import { MatchResolver } from '@resolvers/competition-matches.resolver'
import { TimeFrameResolver } from './resolvers/timeframe.resolver'
import AuthRoute from './routes/auth.route'
import UIRoute from './routes/ui.route'
import { ChallengeResolver } from './resolvers/challenge.resolver'
import { AdmissionResolver } from './resolvers/admission.resolver'

validateEnv()

const app = new App(
  [UserResolver, CompetitionResolver, MatchResolver, TimeFrameResolver, ChallengeResolver, AdmissionResolver],
  [new AuthRoute(), new UIRoute()],
)

app.listen()
