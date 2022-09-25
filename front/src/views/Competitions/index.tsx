import { useQuery } from '@apollo/client'
import Container from '../../components/Container'
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import { Competition } from '../../generated/graphql'
import CompetitionItem from './CompetitionItem'
import { competitionsQuery } from './graphql'


export default function Competitions() {

  const { data, error, loading } = useQuery(competitionsQuery)

  const competitions = data?.getCompetitions?.map((competition: Competition) => 
    <CompetitionItem
      data={competition}
      key={competition.name}
    />
  ) ?? []

  if ( loading ) {
    return <Loading />
  }
  
  return ( 
    <div className='mt-28'>
      <Header>
        Divisions
      </Header>
      <Container>
        {competitions}
      </Container>
    </div>
  )
}