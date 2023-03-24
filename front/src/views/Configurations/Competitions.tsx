import { useQuery } from '@apollo/client'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import CompetitionLogo from '../../components/CompetitionLogo'
import Loading from '../../components/Loading'
import type { Competition } from '../../generated/graphql'
import { competitionsQuery } from '../../graphql'

type CompetitionItemProps = {
  data: Competition
}

function CompetitionItem({ data }: CompetitionItemProps) {
  return (
    <div className="flex flex-row gap-[1px] px-3 bg-gray-500 rounded-xl my-2">
      <div className="bg-white w-[49%] flex flex-row gap-3">
        <CompetitionLogo shortname={data.shortname} size="small" />
        <span className="text-gray-900 font-semibold my-auto h-fit align-middle text-lg">
          {data.name}
        </span>
      </div>
      <div className="bg-white w-full flex flex-row">
        <div className="h-full px-2 flex flex-row w-56 gap-5">
          <span className="text-black text-2xl font-bold my-auto">
            {data.players?.length ?? 0}
          </span>
          <span className="text-gray-600 text-base my-auto">Players</span>
        </div>
        <div className="h-full px-2 flex flex-row w-56 gap-5">
          <span className="text-black text-2xl font-bold my-auto">
            {data.admissions?.length ?? 0}
          </span>
          <span className="text-gray-600 text-base my-auto">Requests</span>
        </div>
        <div className="h-full px-2 flex flex-row flex-grow gap-5">
          <CalendarDaysIcon className="h-6 w-6 stroke-gray-900 my-auto" />
          <span className="text-gray-800 text-base my-auto font-semibold">
            {data.start.split('T')[0]}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Competitions() {
  const { data, loading } = useQuery(competitionsQuery)

  const competitions =
    data?.getCompetitions?.map((competition: Competition) => (
      <CompetitionItem data={competition} key={competition.name} />
    )) ?? []

  if (loading) {
    return <Loading />
  }

  return <div className="mt-6">{competitions}</div>
}
