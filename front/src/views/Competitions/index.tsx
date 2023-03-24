import { useQuery } from '@apollo/client'
import Container from '../../components/Container'
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import type { Competition } from '../../generated/graphql'
import CompetitionItem from './CompetitionItem'
import { competitionsQuery, userQuery } from '../../graphql'
import { useUser } from '../../logic/client'

export default function Competitions() {
  const { data, loading } = useQuery(competitionsQuery)
  const user = useUser()?.user
  const { data: userData } = useQuery(userQuery, {
    variables: { id: user?.id },
    skip: !!user,
  })

  const competitions =
    data?.getCompetitions?.map((competition: Competition) => (
      <CompetitionItem
        data={competition}
        key={competition.name}
        user={userData}
      />
    )) ?? []

  if (loading) {
    return <Loading />
  }

  return (
    <div className="mt-28">
      <Header>Divisions</Header>
      <Container>{competitions}</Container>
    </div>
  )
}
