import Button from '../components/Button'
import * as Icons from '@heroicons/react/24/outline'
import React from 'react'
import classNames from 'classnames'
import type { Competition } from '../generated/graphql'
import CompetitionLogo from '../components/CompetitionLogo'

type Props = {
  close: () => void
  competition: Competition
  playerId: string
}

export default function Admission({ close, competition, playerId }: Props) {
  // const onConfirm = () =>
  //   updateChallenge({ variables: { id, data: { status: 'ACCEPTED' } } })

  if (!open) return null

  const MAIN_CLASSES = classNames(
    'relative mx-auto mt-16 p-12 rounded-3xl',
    'bg-gray-900 w-fit h-fit',
    'flex flex-col gap-10 text-gray-300'
  )

  const COMPETITION_CLASSES = classNames(
    'bg-black/40 rounded-2xl w-[35vw] h-fit',
    'flex flex-row overflow-y-scroll p-10 gap-10'
  )

  return (
    <div className={MAIN_CLASSES}>
      <div className="flex flex-col gap-2">
        <h1 className="flex-none w-60 font-bold text-4xl">Admission</h1>
        <div className="text-gray-500 text-sm">
          Request admission in this competition
        </div>
      </div>

      <div className={COMPETITION_CLASSES}>
        <div className="flex flex-grow w-fit">
          <CompetitionLogo shortname={competition.shortname} size="big" />
        </div>

        <div className="flex flex-col w-full text-xl">
          <div className="text-2xl mb-4">{competition.name}</div>
          <div className="my-3">{competition.players?.length ?? 0} players</div>
          <span className="text-lg">Starts</span>
          <div className="flex flex-row text-lg gap-2">
            <Icons.CalendarDaysIcon className="h-7 w-7" />
            <div className="">{new Date(competition.start).toDateString()}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-3 text-xl">
        Are you sure you want to join this competition?
      </div>

      <div className="flex flex-row gap-5">
        <Button
          colorClasses="bg-green-2"
          label="Sign Up"
          sizeClasses="h-fit w-fit text-lg rounded-full"
          extraClasses="px-6 py-2"
        />
        <Button
          colorClasses="bg-red-500"
          label="Cancel"
          sizeClasses="h-fit w-fit text-lg rounded-full"
          extraClasses="px-6 py-2"
        />
      </div>
    </div>
  )
}
