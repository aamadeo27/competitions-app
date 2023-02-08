import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import Header from '../../components/Header'
import { competitionQuery } from '../../graphql'
import Ranking from './Ranking'
import CompetitionNav, { CompetitionTab } from './CompetitionNav'
import { useState } from 'react'
import Matches from './Matches'
import Loading from '../../components/Loading'



function CompetitionContent({ id }: { id: string }) {
  const { data, loading, error } = useQuery(competitionQuery, {
    variables: { competitionId: id },
  })
  const [tab, setTab] = useState<CompetitionTab>('ranking')

  if (loading) return <Loading />
  if (error) return <div>{error.toString()}</div>

  const competition = data.getCompetitionById

  const rankedList = [...competition.players].sort( (a,b) => (b.score ?? 0) - (a.score ?? 0) )
  const ranking = new Map()
  rankedList.forEach( (u,i) => ranking.set(u.steamId, i))

  const page = {
    ranking: () => <Ranking players={rankedList} />,
    matches: () => <Matches matches={competition.matches} ranking={ranking} />
  }

  return <div className='mt-28'>
    <Header>
      {competition.name}
    </Header>
    <CompetitionNav
      active={tab}
      select={setTab} 
    />
    {page[tab]()}
  </div>
}

export default function CompetitionPage() {
  const { id } = useParams()

  return id
    ? <CompetitionContent id={id} />
    : <div> Loading </div>
}