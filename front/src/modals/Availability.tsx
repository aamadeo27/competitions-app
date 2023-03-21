import Button from '../components/Button'
import * as Icons from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import TimeFrameItem from '../views/Calendar/TimeFrameItem'
import { useMutation, useQuery } from '@apollo/client'
import {
  userQuery,
  timeframeCreate,
  timeframeUpdate,
  timeframeDelete,
} from '../graphql'
import { useUser } from '../logic/client'
import Loading from '../components/Loading'
import type { TimeFrame, User } from '../generated/graphql'
import Input from '../components/Input'
import DaySelector from '../components/DaySelector'
import Dropdown from '../components/Dropdown'
import type { Option } from '../components/Dropdown'
import { pick } from 'lodash'

type Props = {
  close: () => void
}

const HOURS: Option[] = []
for (let i = 0; i < 24; i++) {
  HOURS.push({
    value: i,
    label: (
      <span className="flex-grow text-left">{i < 10 ? `0${i}` : i}:00</span>
    ),
  })
}

export default function AvailabilityModal({ close }: Props) {
  const userCtx = useUser()
  const [tfFields, setTfFields] = useState<TimeFrame>()

  const userResult = useQuery(userQuery, {
    variables: { userId: userCtx?.user?.id ?? '-1' },
  })

  const user = userResult.data?.getUserById

  const [tfCreate, tfcMeta] = useMutation(timeframeCreate)
  const [tfDelete] = useMutation(timeframeDelete)
  const [tfUpdate, tfuMeta] = useMutation(timeframeUpdate)

  useEffect(() => {
    console.log('Data Refreshed')
  }, [userResult.data])

  if (!open) return null

  const MAIN_CLASSES = classNames(
    'relative mx-auto mt-16 p-12 rounded-3xl',
    'bg-gray-900 h-fit w-fit min-w-modal',
    'flex flex-col gap-10 text-gray-300'
  )

  const TF_LIST_CLASSES = classNames(
    'bg-black/40 rounded-2xl w-full h-48',
    'overflow-y-scroll py-4'
  )

  const TF_FORM_CLASSES = classNames(
    'bg-black/40 rounded-2xl w-full min-h-[390px] h-fit',
    'p-5',
    'flex flex-col gap-5'
  )

  const hourPlaceHolder = (type: string) => (
    <span className="flex-grow">Select {type}</span>
  )

  const hourClasses = 'bg-gray-800'

  const onChangeString = (field: string) => (value: string) => {
    setTfFields((old) => ({
      ...old!,
      [field]: value,
    }))
  }

  const onChangeHour = (field: 'end' | 'start') => (value: number) => {
    setTfFields((old) => ({
      ...old!,
      [field]: value,
    }))
  }

  const updateTimeframe = async () => {
    await tfUpdate({
      variables: {
        id: tfFields?.id,
        data: pick(
          tfFields,
          'userId',
          'description',
          'days',
          'start',
          'end',
          'canPlay'
        ),
      },
    })
    userResult.refetch()
    setTfFields(undefined)
  }

  const addLabel = (
    <div className="flex flex-row w-full text-sm">
      <Icons.PlusCircleIcon className="h-5 w-5 mr-2" />
      <span>Add Timeframe</span>
    </div>
  )
  const createTimeframe = async () => {
    await tfCreate({
      variables: {
        data: {
          userId: (user as User).steamId,
          days: '',
          start: 0,
          end: 2,
          description: 'Available',
          canPlay: true,
          validSince: null,
          validUntil: null,
        },
      },
    })
    userResult.refetch()
  }
  const deleteTimeframe = (id: bigint) => async () => {
    await tfDelete({ variables: { id } })
    userResult.refetch()
  }

  const timeframes = userResult.loading ? (
    <Loading />
  ) : (
    (user as User).availability!.map((data, id) => (
      <TimeFrameItem
        key={id}
        {...{
          ...data,
          onClick: () => setTfFields(data),
          remove: deleteTimeframe(data.id),
        }}
      />
    ))
  )

  return (
    <div className={MAIN_CLASSES}>
      <div className="flex-none w-[40vw]">
        <h1 className="font-bold text-lg">Availability</h1>
        <span className="text-sm text-gray-500 block">
          Your availability determines the times when you could play a game with
          an opponent. It consists of a list of time frames, you can visualize
          your availability in the Challenge view of the Calendar.
        </span>
      </div>

      <div className={TF_LIST_CLASSES}>
        <Button
          label={addLabel}
          sizeClasses="ml-5 my-2 pl-1 pr-3 py-1 w-fit h-fit"
          onClick={createTimeframe}
        />
        {timeframes}
      </div>

      <div className={TF_FORM_CLASSES}>
        {tfFields && (
          <>
            <div>
              <Input
                value={tfFields.description ?? ''}
                onChange={onChangeString('description')}
                label="Description"
                size="big"
              />
            </div>

            <div>
              <span className="py-4 text-gray-500 inline-block">
                Days which this timeframe is for
              </span>
              <DaySelector
                value={tfFields.days}
                onChange={onChangeString('days')}
              />
            </div>

            <div className="flex flex-row gap-4 py-2">
              <span className="py-2 text-gray-500 inline-block">From</span>
              <Dropdown
                colorClasses={hourClasses}
                sizeClasses="w-36"
                paddingClasses="py-1"
                onSelect={onChangeHour('start')}
                options={HOURS}
                placeholder={hourPlaceHolder('start')}
                value={tfFields.start}
              />
              <span className="py-2 text-gray-500 inline-block">To</span>
              <Dropdown
                colorClasses={hourClasses}
                sizeClasses="w-36"
                paddingClasses="py-1"
                onSelect={onChangeHour('end')}
                value={tfFields.end}
                options={HOURS}
                placeholder={hourPlaceHolder('end')}
              />
            </div>

            <Button
              disabled={tfcMeta.loading || tfuMeta.loading}
              colorClasses="bg-green-2"
              onClick={updateTimeframe}
              label="Save"
              sizeClasses="h-fit w-fit"
              extraClasses="px-5 py-2"
            />
          </>
        )}
      </div>

      <Button
        onClick={() => close()}
        label={<Icons.XMarkIcon />}
        colorClasses=""
        sizeClasses="h-8 w-8"
        extraClasses="absolute top-5 right-5"
      />
    </div>
  )
}
